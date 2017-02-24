/**
 * Начальный объект состояния для settingsReducer
 */
const InitialState = {
    checkDuration: 120000
}

/**
 * Типы действий, обрабатываемых settingsReducer'ом
 */
export const ActionTypes = {
    CHECK_DURATION_CHANGE: 'CHECK_DURATION_CHANGE'
}

/**
 * Reducer для состояния настроек приложения
 */
export function settingsReducer(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.CHECK_DURATION_CHANGE: {
            return {
                ...state,
                checkDuration: action.payload
            }
        }
    }
    return state
}