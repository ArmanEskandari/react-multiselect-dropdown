import { FC } from 'react';
import styles from './styles.module.scss';

interface DropdownProps {
  open: boolean;
  selectedItems: { value: string }[];
  itemClickHandler: (value: string, selectIfExist?: boolean) => () => void;
  menu: { value: string }[];
}

const Dropdown: FC<DropdownProps> = ({
  open,
  selectedItems,
  itemClickHandler,
  menu,
}) => {
  return (
    <>
      {open && (
        <div className={styles.selectMenu}>
          <ul>
            {menu.map((menuItem, index) => {
              const isSelected = selectedItems.some(
                item => item.value === menuItem.value,
              );
              return (
                <li key={index} className={isSelected ? styles.selected : ''}>
                  <button onClick={itemClickHandler(menuItem.value)}>
                    {menuItem.value}
                  </button>
                  {isSelected && <span>✅</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export { Dropdown };
