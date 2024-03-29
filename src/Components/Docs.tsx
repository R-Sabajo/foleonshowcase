import styled from 'styled-components';
import { ProjectInfo } from './ProjectInfo';
import { DocList } from './DocList';
import { DocsNav } from './DocsNav';
import { Pagination } from './Pagination';

export const Docs = () => {
	return (
		<Container>
			<ProjectInfo />
			<DocsNav />
			<DocList />
			<Pagination />
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 60px 80px 1fr 50px;
	grid-template-areas:
		'projectinfo'
		'docsnav'
		'doclist'
		'pagination';

	overflow-y: auto;
	width: 100%;
	height: 100%;
	grid-area: docs;
	background: var(--Light-Grey);
	color: var(--Dark-Blue);
	z-index: 2;
`;
