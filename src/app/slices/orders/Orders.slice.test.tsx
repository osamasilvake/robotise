import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppReducerType } from '..';
import { failure, initialState, loader, OrdersFetchList, success } from './Orders.slice';
import { SliceOrdersInterface } from './Orders.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<SliceOrdersInterface, DispatchExts>([thunk]);

describe('[SLICE] Order', () => {
	it('[OrdersFetchList] Creates loading and success actions on successful fetch request', () => {
		const store = mockStore(initialState);
		const siteId = '10549e17-3f9a-4a01-9fde-20b953a180ed';
		const robotId = '2ee43036-37e5-46f6-9ccc-8054eb67ec2b';
		const orderId = '1db0f232-9a2a-47c6-906c-dc390dba4996';
		const apiResponse = {
			data: [
				{
					attributes: {
						mode: 'mini-bar',
						origin: 'phone',
						location: '661',
						status: 'finished',
						createdAt: '2021-04-22T08:31:44.884Z',
						updatedAt: '2021-04-22T08:38:02.172Z',
						site: {
							id: siteId
						},
						robot: {
							id: robotId
						}
					},
					id: orderId,
					type: 'orders'
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
					id: orderId,
					mode: 'CONTENT.ORDERS.COMMON.MODE.mini-bar',
					origin: 'CONTENT.ORDERS.LIST.TABLE.VALUES.ORIGIN.phone',
					location: '661',
					status: 'CONTENT.ORDERS.LIST.TABLE.VALUES.STATUS.finished',
					createdAt: '2021-04-22T08:31:44.884Z',
					updatedAt: '2021-04-22T08:38:02.172Z',
					site: {
						id: siteId
					},
					robot: {
						id: robotId
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
			},
			state: {
				robotId,
				page: 1,
				rowsPerPage: 50,
				activeOrders: false,
				debug: false
			}
		};
		const payload = {
			robotId,
			page: 1,
			rowsPerPage: 50,
			activeOrders: false,
			debug: false
		};

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		store
			.dispatch(OrdersFetchList(payload))
			.then(() => {
				// assert
				const expectedActions = [loader(), success(mappedResult)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[OrdersFetchList] Creates loading and failure actions on unsuccessful fetch request', () => {
		const store = mockStore(initialState);
		const robotId = '2ee43036-37e5-46f6-9ccc-8054eb67ec2b';
		const payload = {
			robotId,
			page: 0,
			rowsPerPage: 50,
			activeOrders: false,
			debug: false
		};

		// mock api once
		const apiResponse = new Error('PAGE_ERROR.DESCRIPTION');
		const message: TriggerMessageInterface = {
			id: 'fetch-orders-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: 'PAGE_ERROR.DESCRIPTION'
		};
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// act
		store
			.dispatch(OrdersFetchList(payload))
			.then(() => {
				// assert
				const expectedActions = [loader(), failure(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
