import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppReducerType } from '..';
import { failure, initialState, loader, OrderFetch, success } from './Order.slice';
import { SliceOrderInterface } from './Order.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<SliceOrderInterface, DispatchExts>([thunk]);

describe('[SLICE] Order', () => {
	it('[OrderFetch] Creates loading and success actions on successful fetch request', () => {
		const store = mockStore(initialState);
		const orderId = '1db0f232-9a2a-47c6-906c-dc390dba4996';
		const apiResponse = {
			data: {
				attributes: {
					mode: 'mini-bar',
					origin: 'phone',
					room: '661',
					status: 'finished',
					createdAt: '2021-04-22T08:31:44.884Z',
					updatedAt: '2021-04-22T08:38:02.172Z'
				},
				id: orderId,
				type: 'orders'
			}
		};
		const mappedResult = {
			id: orderId,
			mode: 'mini-bar',
			origin: 'phone',
			room: '661',
			status: 'finished',
			createdAt: '2021-04-22T08:31:44.884Z',
			updatedAt: '2021-04-22T08:38:02.172Z'
		};

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		store
			.dispatch(OrderFetch(orderId))
			.then(() => {
				// assert
				const expectedActions = [loader(), success(mappedResult)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[OrderFetch] Creates loading and failure actions on unsuccessful fetch request', () => {
		const store = mockStore(initialState);
		const orderId = '1db0f232-9a2a-47c6-906c-dc390dba4996';

		// mock api once
		const apiResponse = new Error('API.FETCH');
		const message: TriggerMessageInterface = {
			id: 'fetch-order-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: 'API.FETCH'
		};
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// act
		store
			.dispatch(OrderFetch(orderId))
			.then(() => {
				// assert
				const expectedActions = [loader(), failure(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
