import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { RobotContentDetailCameraTypeEnum } from '../../screens/business/robots/content/detail/camera/RobotContentDetailCameras.enum';
import RobotsService from '../../screens/business/robots/Robots.service';
import { timeout } from '../../utilities/methods/Timeout';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import { RobotTypeEnum } from './Robot.slice.enum';
import { RobotSliceInterface } from './Robot.slice.interface';

// initial state
export const initialState: RobotSliceInterface = {
	cameras: {
		base: {
			loading: false,
			content: null,
			errors: null
		},
		top: {
			loading: false,
			content: null,
			errors: null
		}
	}
};

// slice
const dataSlice = createSlice({
	name: 'Robot',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module, type } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (type === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = true;
				}
				if (type === RobotContentDetailCameraTypeEnum.TOP) {
					state.cameras.top.loading = true;
				}
			}
		},
		success: (state, action) => {
			const { module, type, response } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (type === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = false;
					state.cameras.base.content = response;
					state.cameras.base.errors = null;
				}
				if (type === RobotContentDetailCameraTypeEnum.TOP) {
					state.cameras.top.loading = false;
					state.cameras.top.content = response;
					state.cameras.top.errors = null;
				}
			}
		},
		failure: (state, action) => {
			const { module, type, response } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (type === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = false;
					state.cameras.base.content = null;
					state.cameras.base.errors = response;
				}
				if (type === RobotContentDetailCameraTypeEnum.TOP) {
					state.cameras.top.loading = false;
					state.cameras.top.content = null;
					state.cameras.top.errors = response;
				}
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotSelector = (state: AppReducerType) => state['robot'];

// reducer
export default dataSlice.reducer;

/**
 * camera: request robot image
 * @param type
 * @param id
 * @returns
 */
export const RobotCameraRequestImage = (type: string, id: string) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.CAMERAS,
		type
	};

	// dispatch: loader
	dispatch(loading(state));

	// timeout: 1.5 sec
	await timeout(1500);

	return RobotsService.robotRequestImage(type, id)
		.then((res) => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.SUCCESS,
				text: 'ROBOT.CAMERAS.SUCCESS'
			};

			// dispatch: success
			dispatch(success({ ...state, response: res.data }));

			// dispatch: trigger message
			dispatch(triggerMessage(message));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'ROBOT.CAMERAS.ERROR'
			};

			// dispatch: error
			dispatch(failure({ ...state, response: message }));

			// dispatch: trigger message
			dispatch(triggerMessage(message));
		});
};
