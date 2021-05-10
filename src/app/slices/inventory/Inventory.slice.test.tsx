import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppReducerType } from '..';
import { failure, initialState, InventoryFetchList, loader } from './Inventory.slice';
import { SliceInventoryInterface } from './Inventory.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<SliceInventoryInterface, DispatchExts>([thunk]);

describe('[SLICE] Inventory', () => {
	it('[InventoryFetchList] Creates loading and success actions on successful fetch request', () => {
		const store = mockStore(initialState);
		const robotId = '2ee43036-37e5-46f6-9ccc-8054eb67ec2b';
		const apiResponse = {
			data: {
				attributes: {
					drawers: [
						{
							index: 0,
							lanes: [
								{
									index: 0,
									status: 'low',
									capacity: 12,
									quantity: 0,
									inCartQuantity: 2,
									product_id: 'fbee95a4-a7d0-4561-bd5f-3ca55f831053'
								}
							],
							is_empty: false,
							lane_count: 2,
							type: 'delivery'
						}
					],
					status: 'low'
				},
				id: 'd7c65fa9-ad98-4f7f-a94b-c62c05b227c0',
				type: 'inventories'
			},
			robot: {
				id: robotId
			}
		};
		/**
		const mappedResult = {
			id: 'ffc23dcf-193d-4e5b-9ada-758a6ea37b8a',
			drawers: [
				{
					index: 0,
					lanes: [
						{
							index: 0,
							status: 'low',
							capacity: 12,
							quantity: 0,
							inCartQuantity: 2,
							product_id: 'fbee95a4-a7d0-4561-bd5f-3ca55f831053'
						}
					],
					is_empty: false,
					lane_count: 2,
					type: 'delivery'
				}
			],
			status: 'low',
			robot: {
				id: robotId
			}
		};
		*/

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		store
			.dispatch(InventoryFetchList(robotId))
			.then(() => {
				// assert
				const expectedActions = [loader()];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[InventoryFetchList] Creates loading and failure actions on unsuccessful fetch request', () => {
		const store = mockStore(initialState);
		const robotId = '2ee43036-37e5-46f6-9ccc-8054eb67ec2b';

		// mock api once
		const apiResponse = new Error('API.FETCH');
		const message: TriggerMessageInterface = {
			id: 'fetch-inventory-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: 'API.FETCH'
		};
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// act
		store
			.dispatch(InventoryFetchList(robotId))
			.then(() => {
				// assert
				const expectedActions = [loader(), failure(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
