import axios from 'axios';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function generateMovieInsights(movieData) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured.');
  }

  console.log('Calling Anthropic API with key:', apiKey ? apiKey.slice(0, 10) + '...' : 'MISSING');

  const prompt = buildPrompt(movieData);

  try {
    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const rawText = response.data.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    return parseInsights(rawText);
  } catch (err) {
    // Log the full Anthropic error response
    if (err.response) {
      console.error('Anthropic API error status:', err.response.status);
      console.error('Anthropic API error body:', JSON.stringify(err.response.data, null, 2));
    }
    // Don't crash the whole request — return fallback insights instead
    console.error('AI insights failed, using fallback.');
    return {
      sentimentSummary: 'AI insights could not be generated at this time.',
      sentimentClassification: 'mixed',
      sentimentScore: 50,
      audienceHighlights: [],
      criticalReception: 'N/A',
      rewatch: 'N/A',
      targetAudience: 'General audiences',
    };
  }
}

function buildPrompt(movie) {
  return `You are a film critic and data analyst. Based on the following movie metadata, generate audience sentiment insights as if you have analyzed hundreds of audience reviews.

Movie: "${movie.title}" (${movie.year})
Genre: ${movie.genre}
Director: ${movie.director}
Cast: ${movie.actors}
Plot: ${movie.plot}
IMDb Rating: ${movie.imdbRating}/10 (${movie.imdbVotes} votes)
Awards: ${movie.awards}
Ratings: ${JSON.stringify(movie.ratings)}

Respond ONLY with a valid JSON object in this exact format (no markdown, no extra text):
{
  "sentimentSummary": "A 2-3 sentence summary of how audiences generally feel about this film",
  "sentimentClassification": "positive",
  "sentimentScore": 85,
  "audienceHighlights": ["highlight 1", "highlight 2", "highlight 3"],
  "criticalReception": "One sentence about critical reception",
  "rewatch": "One sentence about rewatchability",
  "targetAudience": "Who would enjoy this film most"
}`;
}

function parseInsights(rawText) {
  try {
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      sentimentSummary: 'Unable to generate insights at this time.',
      sentimentClassification: 'mixed',
      sentimentScore: 50,
      audienceHighlights: [],
      criticalReception: 'N/A',
      rewatch: 'N/A',
      targetAudience: 'General audiences',
    };
  }
}
