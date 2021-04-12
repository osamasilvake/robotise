import { AnyAction } from '@reduxjs/toolkit';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { AppReducerType } from '..';
import {
	applyThemePalette,
	changeLanguage,
	fetchChangeLog,
	GeneralApplyThemePalette,
	GeneralChangeLanguage,
	GeneralFetchChangelog,
	GeneralSetDrawerState,
	GeneralTriggerMessage,
	initialState,
	setDrawerState,
	triggerMessage
} from './General.slice';
import { GeneralLanguageTypeEnum, GeneralThemePaletteTypeEnum } from './General.slice.enum';
import { GeneralSliceInterface } from './General.slice.interface';

// mock store
type DispatchExts = ThunkDispatch<AppReducerType, void, AnyAction>;
const mockStore = createMockStore<GeneralSliceInterface, DispatchExts>([thunk]);

describe('[SLICE] General', () => {
	it('[GeneralSetDrawerState] Set drawer state', () => {
		const store = mockStore(initialState);
		const cState = true;

		// act
		store
			.dispatch(GeneralSetDrawerState(cState))
			.then(() => {
				// assert
				const expectedActions = [setDrawerState(cState)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[GeneralApplyThemePalette] Apply theme palette', () => {
		const store = mockStore(initialState);
		const cTheme = GeneralThemePaletteTypeEnum.LIGHT;

		// act
		store
			.dispatch(GeneralApplyThemePalette(cTheme))
			.then(() => {
				// assert
				const expectedActions = [applyThemePalette(cTheme)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[GeneralChangeLanguage] Change app language', () => {
		const store = mockStore(initialState);
		const cLanguage = GeneralLanguageTypeEnum.DE;

		// act
		store
			.dispatch(GeneralChangeLanguage(cLanguage))
			.then(() => {
				// assert
				const expectedActions = [changeLanguage(cLanguage)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[GeneralTriggerMessage] Trigger message', () => {
		const store = mockStore(initialState);
		const message: TriggerMessageInterface = {
			id: 'general-trigger-message',
			show: true,
			severity: TriggerMessageTypeEnum.INFO,
			text: 'TEST'
		};

		// act
		store
			.dispatch(GeneralTriggerMessage(message))
			.then(() => {
				// assert
				const expectedActions = [triggerMessage(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[GeneralFetchChangelog] Fetch changelog', () => {
		const store = mockStore(initialState);

		// act
		store
			.dispatch(GeneralFetchChangelog())
			.then((res) => {
				// assert
				const expectedActions = [fetchChangeLog(JSON.stringify(res))];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
