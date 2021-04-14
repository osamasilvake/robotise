import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppReducerType } from '..';
import { failure, initialState, loading, RobotLocationMapFetch, success } from './Robot.slice';
import { RobotTypeEnum } from './Robot.slice.enum';
import { RSInterface } from './Robot.slice.interface';

// mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<RSInterface, DispatchExts>([thunk]);

describe('[SLICE] General', () => {
	it('[RobotDetailLocation] Creates loading and success actions on successful fetch request', () => {
		const store = mockStore(initialState);
		const mapId = 'portalklinik_1a';
		const state = {
			module: RobotTypeEnum.MAP,
			type: null
		};
		const apiResponse = {
			data: {
				attributes: {
					name: 'portalklinik_1a',
					floor: 0,
					resolution: 0.05,
					origin: [-50, -50, 0],
					imagePath: '/v1/storage/maps/portalklinik_1a.jpg',
					updatedAt: '2021-03-19T08:22:43.463Z',
					createdAt: '2021-03-18T07:07:44.478Z'
				},
				id: '7b0ee76a-0a6f-473c-ac2b-51bb3996fca4',
				type: 'maps'
			}
		};
		const mappedResult = {
			id: '7b0ee76a-0a6f-473c-ac2b-51bb3996fca4',
			name: 'portalklinik_1a',
			floor: 0,
			resolution: 0.05,
			origin: [-50, -50, 0],
			imagePath: '/v1/storage/maps/portalklinik_1a.jpg',
			updatedAt: '2021-03-19T08:22:43.463Z',
			createdAt: '2021-03-18T07:07:44.478Z'
		};

		// mock api once
		mockedAxios.get.mockResolvedValueOnce({
			data: apiResponse
		});

		// act
		store
			.dispatch(RobotLocationMapFetch(mapId))
			.then(() => {
				// assert
				const expectedActions = [
					loading(state),
					success({ ...state, response: mappedResult })
				];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[RobotDetailLocation] Creates loading and failure actions on unsuccessful fetch request', () => {
		const store = mockStore(initialState);
		const mapId = 'portalklinik_1a';
		const state = {
			module: RobotTypeEnum.MAP,
			type: null
		};

		// mock api once
		const apiResponse = new Error('API.FETCH');
		const message: TriggerMessageInterface = {
			id: 'fetch-rt-error',
			show: true,
			severity: TriggerMessageTypeEnum.ERROR,
			text: apiResponse.message
		};
		mockedAxios.get.mockRejectedValueOnce(apiResponse);

		// act
		store
			.dispatch(RobotLocationMapFetch(mapId))
			.then(() => {
				// assert
				const expectedActions = [loading(state), failure({ ...state, response: message })];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
