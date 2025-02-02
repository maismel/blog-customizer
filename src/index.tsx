import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStyles, setArticleStyles] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
	});

	const applyStyles = (newStyles: Partial<typeof articleStyles>) => {
		setArticleStyles((prev) => ({ ...prev, ...newStyles }));

		// Установка CSS-переменных
		Object.entries(newStyles).forEach(([key, value]) => {
			document.documentElement.style.setProperty(`--${key}`, value);
		});
	};

	return (
		<main className={clsx(styles.main)} style={articleStyles as CSSProperties}>
			<ArticleParamsForm onApply={applyStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
