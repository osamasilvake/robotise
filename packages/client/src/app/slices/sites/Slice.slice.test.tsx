import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { triggerMessage } from '../general/General.slice';
import { failure, initialState, loading, SitesFetchList, success } from './Sites.slice';
import { SSInterface } from './Sites.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<SSInterface, void, AnyAction>;
const mockStore = createMockStore<SSInterface, DispatchExts>([thunk]);

describe('[SLICE] Sites', () => {
	it('[Thunk][SitesFetchList] Creates loading and success actions on successful fetch request ', () => {
		// store
		const store = mockStore(initialState);

		// arrange
		const apiResponse = {
			data: [
				{
					attributes: {
						acceptOrders: true,
						createdAt: '2021-03-16T14:58:41.982Z',
						timezone: 'Europe/Berlin',
						title: 'Cliniserve / Portalklinik',
						updatedAt: '2021-03-18T13:00:03.175Z'
					},
					id: 'd190585d-9e8b-43a9-94fc-141c0ca7d78e',
					relationships: {
						robots: {
							data: [
								{
									id: '4c00971b-d127-4a46-9a34-400019f2c463',
									type: 'robots'
								}
							]
						}
					}
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
			}
		};
		const mappedResult = {
			data: [
				{
					acceptOrders: true,
					createdAt: '2021-03-16T14:58:41.982Z',
					timezone: 'Europe/Berlin',
					title: 'Cliniserve / Portalklinik',
					updatedAt: '2021-03-18T13:00:03.175Z',
					id: 'd190585d-9e8b-43a9-94fc-141c0ca7d78e',
					robots: [null]
				}
			],
			dataById: {
				['d190585d-9e8b-43a9-94fc-141c0ca7d78e']: {
					acceptOrders: true,
					createdAt: '2021-03-16T14:58:41.982Z',
					timezone: 'Europe/Berlin',
					title: 'Cliniserve / Portalklinik',
					updatedAt: '2021-03-18T13:00:03.175Z',
					id: 'd190585d-9e8b-43a9-94fc-141c0ca7d78e',
					robots: [null]
				}
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

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		return store
			.dispatch(SitesFetchList())
			.then(() => {
				// assert
				const expectedActions = [loading(), success(mappedResult)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[Thunk][SitesFetchList] Creates loading and failure actions on unsuccessful fetch request ', () => {
		// store
		const store = mockStore(initialState);

		// mock api once
		const apiResponse = new Error('API.FETCH');
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// arrange
		const message: TriggerMessageInterface = {
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: apiResponse.message
		};

		// act
		return store
			.dispatch(SitesFetchList())
			.then(() => {
				// assert
				const expectedActions = [loading(), failure(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
