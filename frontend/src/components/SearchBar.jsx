import { useState } from 'react';
import { isValidInput, formatInput } from '../lib/validation';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
    if (validationError) setValidationError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = formatInput(value);

    if (!trimmed || !isValidInput(trimmed)) {
      setValidationError('Please enter a movie title or IMDb ID.');
      return;
    }

    onSearch(trimmed);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={`${styles.input} ${validationError ? styles.inputError : ''}`}
          value={value}
          onChange={handleChange}
          placeholder="Search by movie title or IMDb ID (e.g. tt0133093)"
          disabled={loading}
          aria-label="Movie title or IMDb ID"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading}
          aria-label="Analyze movie"
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <span className={styles.buttonContent}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Analyze
            </span>
          )}
        </button>
      </div>
      {validationError && (
        <p className={styles.error} role="alert">{validationError}</p>
      )}
    </form>
  );
}
