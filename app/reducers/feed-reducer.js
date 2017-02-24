import _ from 'lodash'
import moment from 'moment'

/**
 * Начальный объект состояния для feedReducer
 */
const InitialState = {
    entries: [],
    hiddenEntries: [],
    favorites: JSON.parse(localStorage.getItem('favoriteEntries')) || [],
    loading: false,
    loaded: true,
    error: null
}

/**
 * Типы действий, обрабатываемых feedReducer'ом
 */
export const ActionTypes = {
    ENTRIES_LOADING: 'ENTRIES_LOADING',
    ENTRIES_LOADING_SUCCESS: 'ENTRIES_LOADING_SUCCESS',
    ENTRIES_LOADING_FAILURE: 'ENTRIES_LOADING_FAILURE',
    ENTRIES_CHANNEL_FILTER: 'ENTRIES_CHANNEL_FILTER',
    CHANNEL_DELETE: 'CHANNEL_DELETE',
    ENTRY_HIDE: 'ENTRY_HIDE',
    ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
    REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES'
}

/**
 * Reducer, управляющий состоянием записей, находящихся в ленте
 */
export function feedReducer(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.ENTRIES_LOADING: {
            return { ...state, loading: true, loaded: false }
        }
        case ActionTypes.ENTRIES_LOADING_FAILURE: {
            return { ...state, loading: false, error: action.payload }
        }
        case ActionTypes.ENTRIES_LOADING_SUCCESS: {
            let newEntries = _.uniqBy([...state.entries, ...action.payload], 'title')
            newEntries.sort((item1, item2) => item1.timestamp - item2.timestamp)//moment(item1.timestamp, MOMENT_FORMAT).diff(moment(item2.timestamp, MOMENT_FORMAT)))
            return { 
                ...state, 
                loading: false, 
                loaded: true,
                entries: newEntries,
                error: null
            }
        }
        case ActionTypes.ENTRIES_CHANNEL_FILTER: {
            return {
                ...state,
                entries: state.entries.filter(entry => entry.channel.title === action.payload)
            }
        }
        case ActionTypes.CHANNEL_DELETE: {
            return {
                ...state,
                entries: state.entries.filter(entry => entry.channel.title !== action.payload)
            }
        }
        case ActionTypes.ENTRY_HIDE: {
            return {
                ...state,
                hiddenEntries: [...state.hiddenEntries ,state.entries.find(entry => entry.title === action.payload)],
                entries: state.entries.filter(entry => entry.title !== action.payload),
            }
        }
        case ActionTypes.ADD_TO_FAVORITES: {
            if (state.favorites.find(fav => fav.title === action.payload.title)) {
                return state
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        }
        case ActionTypes.REMOVE_FROM_FAVORITES: {
            return {
                ...state,
                favorites: state.favorites.filter(entry => entry.title !== action.payload)
            }
        }
    }
    return state;
}