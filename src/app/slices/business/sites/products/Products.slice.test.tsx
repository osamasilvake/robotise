import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { AppReducerType } from '../../..';
import { failure, initialState, loader, ProductsFetchList, success } from './Products.slice';
import { SliceProductsInterface } from './Products.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<SliceProductsInterface, DispatchExts>([thunk]);

describe('[SLICE] Inventory', () => {
	it('[ProductsFetchList] Creates loading and success actions on successful fetch request', () => {
		const store = mockStore(initialState);
		const siteId = '10549e17-3f9a-4a01-9fde-20b953a180ed';
		const apiResponse = {
			data: [
				{
					attributes: {
						createdAt: '2020-12-15T12:42:54.958Z',
						image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAA',
						length: 38,
						name: 'Kambly Cookies',
						price: 15,
						updatedAt: '2021-03-31T15:30:41.080Z',
						volume: '80g'
					},
					id: 'ffc23dcf-193d-4e5b-9ada-758a6ea37b8a',
					type: 'products'
				}
			],
			site: {
				id: siteId
			},
			meta: {
				hasNextPage: false,
				hasPrevPage: false,
				nextPage: null,
				page: 1,
				prevPage: null,
				totalDocs: 11,
				totalPages: 1
			}
		};
		const mappedResult = {
			data: [
				{
					id: 'ffc23dcf-193d-4e5b-9ada-758a6ea37b8a',
					createdAt: '2020-12-15T12:42:54.958Z',
					image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAA',
					length: 38,
					name: 'Kambly Cookies',
					price: 15,
					updatedAt: '2021-03-31T15:30:41.080Z',
					volume: '80g'
				}
			],
			meta: {
				hasNextPage: false,
				hasPrevPage: false,
				nextPage: null,
				page: 1,
				prevPage: null,
				totalDocs: 11,
				totalPages: 1
			},
			state: {
				pSiteId: siteId
			}
		};

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		store
			.dispatch(ProductsFetchList(siteId))
			.then(() => {
				// assert
				const expectedActions = [loader(), success(mappedResult)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[ProductsFetchList] Creates loading and failure actions on unsuccessful fetch request', () => {
		const store = mockStore(initialState);
		const siteId = '10549e17-3f9a-4a01-9fde-20b953a180ed';

		// mock api once
		const apiResponse = new Error('PAGE_ERROR.DESCRIPTION');
		const message: TriggerMessageInterface = {
			id: 'fetch-products-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: 'PAGE_ERROR.DESCRIPTION'
		};
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// act
		store
			.dispatch(ProductsFetchList(siteId))
			.then(() => {
				// assert
				const expectedActions = [loader(), failure(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
