import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

interface Props {
	onApply: (styles: Record<string, string>) => void;
}

export const ArticleParamsForm = ({ onApply }: Props) => {
	const [open, setIsOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState<OptionType | null>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType | null>(
		defaultArticleState.fontSizeOption
	);
	const [selectedColor, setSelectedColor] = useState<OptionType | null>(
		defaultArticleState.fontColor
	);
	const [selectedBg, setSelectedBg] = useState<OptionType | null>(
		defaultArticleState.backgroundColor
	);
	const [selectedWidth, setSelectedWidth] = useState<OptionType | null>(
		defaultArticleState.contentWidth
	);

	const asideRef = useRef<HTMLElement | null>(null);

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}

	useOutsideClickClose({
		isOpen: open,
		rootRef: asideRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply({
							'--font-family': selectedFont?.value || '',
							'--font-size': selectedFontSize?.value || '',
							'--font-color': selectedColor?.value || '',
							'--container-width': selectedWidth?.value || '',
							'--bg-color': selectedBg?.value || '',
						});
					}}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={setSelectedFont}
						placeholder='Выберите шрифт'
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize ?? fontSizeOptions[0]}
						onChange={setSelectedFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedColor}
						options={fontColors}
						onChange={setSelectedColor}
						placeholder='Выберите цвет шрифта'
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBg}
						options={backgroundColors}
						onChange={setSelectedBg}
						placeholder='Выберите цвет фона'
						title='Цвет фона'
					/>
					<Select
						selected={selectedWidth}
						options={contentWidthArr}
						onChange={setSelectedWidth}
						placeholder='Выберите ширину контента'
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								const defaultStyles = {
									'--font-family': defaultArticleState.fontFamilyOption.value,
									'--font-size': defaultArticleState.fontSizeOption.value,
									'--font-color': defaultArticleState.fontColor.value,
									'--container-width': defaultArticleState.contentWidth.value,
									'--bg-color': defaultArticleState.backgroundColor.value,
								};

								setSelectedFont(defaultArticleState.fontFamilyOption);
								setSelectedFontSize(defaultArticleState.fontSizeOption);
								setSelectedColor(defaultArticleState.fontColor);
								setSelectedBg(defaultArticleState.backgroundColor);
								setSelectedWidth(defaultArticleState.contentWidth);

								onApply(defaultStyles);
							}}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
