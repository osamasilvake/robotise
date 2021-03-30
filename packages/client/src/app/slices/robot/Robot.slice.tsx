import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { RobotContentDetailCameraTypeEnum } from '../../screens/business/robots/content/detail/cameras/RobotContentDetailCameras.enum';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobot } from '../../utilities/serializers/json-api/Robot.deserialize';
import { AppReducerType } from '..';
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
			const { module, camera } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (camera === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = true;
				}
				if (camera === RobotContentDetailCameraTypeEnum.TOP) {
					state.cameras.top.loading = true;
				}
			}
		},
		success: (state, action) => {
			const { module, camera, response } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (camera === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = false;
					state.cameras.base.content = response;
					state.cameras.base.errors = null;
				}
				if (camera === RobotContentDetailCameraTypeEnum.TOP) {
					state.cameras.top.loading = false;
					state.cameras.top.content = response;
					state.cameras.top.errors = null;
				}
			}
		},
		failure: (state, action) => {
			const { module, camera, response } = action.payload;
			if (module === RobotTypeEnum.CAMERAS) {
				if (camera === RobotContentDetailCameraTypeEnum.BASE) {
					state.cameras.base.loading = false;
					state.cameras.base.content = null;
					state.cameras.base.errors = response;
				}
				if (camera === RobotContentDetailCameraTypeEnum.TOP) {
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
 * request for robot camera image
 * @param camera
 * @param robotId
 * @returns
 */
export const RobotCameraRequestImage = (
	camera: RobotContentDetailCameraTypeEnum,
	robotId: string
) => async (dispatch: Dispatch) => {
	const state = {
		module: RobotTypeEnum.CAMERAS,
		camera
	};

	// dispatch: loader
	dispatch(loading(state));

	return RobotsService.robotRequestImage(camera, robotId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeRobot(res);

			// dispatch: success
			dispatch(success({ ...state, response: result }));
		})
		.catch(() => {
			// dispatch: error
			dispatch(failure({ ...state, response: 'Error' }));
		});
};
