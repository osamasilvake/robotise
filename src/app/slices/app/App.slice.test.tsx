import { AnyAction } from '@reduxjs/toolkit';
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { RootState } from '..';
import {
	AppApplyThemePalette,
	AppChangeLanguage,
	applyThemePalette,
	AppSetDrawerState,
	AppTriggerMessage,
	changeLanguage,
	initialState,
	setDrawerState,
	triggerMessage
} from './App.slice';
import { AppLanguageTypeEnum, AppThemePaletteTypeEnum } from './App.slice.enum';
import { SliceAppInterface } from './App.slice.interface';

// mock store
type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
const mockStore = createMockStore<SliceAppInterface, DispatchExts>([thunk]);

describe('[SLICE] App', () => {
	it('[AppSetDrawerState] Set drawer state', () => {
		const store = mockStore(initialState);
		const cState = true;

		// act
		store
			.dispatch(AppSetDrawerState(cState))
			.then(() => {
				// assert
				const expectedActions = [setDrawerState(cState)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AppApplyThemePalette] Apply theme palette', () => {
		const store = mockStore(initialState);
		const cTheme = AppThemePaletteTypeEnum.LIGHT;

		// act
		store
			.dispatch(AppApplyThemePalette(cTheme))
			.then(() => {
				// assert
				const expectedActions = [applyThemePalette(cTheme)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AppChangeLanguage] Change app language', () => {
		const store = mockStore(initialState);
		const cLanguage = AppLanguageTypeEnum.DE;

		// act
		store
			.dispatch(AppChangeLanguage(cLanguage))
			.then(() => {
				// assert
				const expectedActions = [changeLanguage(cLanguage)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});

	it('[AppTriggerMessage] Trigger message', () => {
		const store = mockStore(initialState);
		const message: TriggerMessageInterface = {
			id: 'app-trigger-message',
			show: true,
			severity: TriggerMessageTypeEnum.INFO,
			text: 'TEST'
		};

		// act
		store
			.dispatch(AppTriggerMessage(message))
			.then(() => {
				// assert
				const expectedActions = [triggerMessage(message)];
				expect(store.getActions()).toEqual(expectedActions);
			})
			.catch();
	});
});
