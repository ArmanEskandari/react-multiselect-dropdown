import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-click-outside.ts';
import { Dropdown } from '../drop-down';
import { SearchInput } from '../search-input';
import styles from './styles.module.scss';

interface Props {
  className?: string;
}

const OPTIONS: { value: string }[] = [
  { value: 'value-1' },
  { value: 'value-2' },
  { value: 'value-3' },
  { value: 'value-4' },
];

const MultiselectDropdown: FC<Props> = () => {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowOptions(false));
  const [selectedOptions, setSelectedOptions] = useState<{ value: string }[]>(
    [],
  );
  const [menuOptions, setMenuOptions] = useState<{ value: string }[]>(OPTIONS);
  const [searchValue, setSearchValue] = useState('');

  const handleRemoveOption = (value: string) => () =>
    setSelectedOptions(prev => prev.filter(option => option.value !== value));

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleClearInput = () => setSearchValue('');

  const handleSelectOption = (value: string, selectIfExist?: boolean) => () => {
    if (checkIfSelected(value) && !selectIfExist) {
      return handleRemoveOption(value)();
    } else {
      return setSelectedOptions(prevState => [...prevState, { value }]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = event;
    const { value } = target as HTMLInputElement;

    if (key === 'Enter' && value.trim() !== '') {
      const alreadySelected = selectedOptions.some(
        option => option.value === value.trim(),
      );

      const alreadyInMenu = menuOptions.some(
        option => option.value === value.trim(),
      );

      if (!alreadySelected && !alreadyInMenu) {
        setMenuOptions(prevState => [...prevState, { value: value.trim() }]);
      }

      handleSelectOption(value, !checkIfSelected(value.trim()))();
      handleClearInput();
    }
  };

  const checkIfSelected = (value: string) =>
    !!selectedOptions.find(option => option.value === value);
  return (
    <div className={styles.Dropdown}>
      <ul className={styles.selectedOptions}>
        {selectedOptions.map(option => (
          <li key={option.value} className={styles.chip}>
            <span>{option.value}</span>
            <button
              onClick={handleRemoveOption(option.value)}
              className={styles.remove}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div ref={ref} className={styles.wrapper}>
        <SearchInput
          value={searchValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowOptions(true)}
          onClear={handleClearInput}
        />
        <Dropdown
          selectedItems={selectedOptions}
          open={searchValue.length > 0 || showOptions}
          menu={menuOptions}
          itemClickHandler={handleSelectOption}
        />
      </div>
    </div>
  );
};

export { MultiselectDropdown };
