import { ChangeEvent, FC, KeyboardEvent } from 'react';
import styles from './styles.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: VoidFunction;
  onClear: VoidFunction;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onClear,
}) => {
  return (
    <>
      <div className={styles.searchInput}>
        <input
          placeholder="type..."
          className={styles.input}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
        />
        {value.length > 0 && (
          <button className={styles.clearButton} onClick={onClear}>
            X
          </button>
        )}
      </div>
    </>
  );
};

export { SearchInput };
