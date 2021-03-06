import Vue from 'vue';
import Vuex from 'vuex';
import {
    fetchResponse,
    executeCurlRequest,
    executeAuthRequest
} from './async-actions/fetch-process-request';
import {
    getSavedRequest
} from './async-actions/get-saved-request';
import {
    saveRequest
} from './async-actions/save-request';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        inputData: {
            method: "GET",
            fetchUrl: "",
            requestBody: "Request body",    
            requestHeaders: {}
        },
        response: 'click on send to see the response.',
        snackBar: {
            visible: false,
            text: ''
        },
        curlCode: "",
        curlResponse: "",
        authResponse: "",
        pksCreds: {
            username: "",
            password: "",
            env: ""
        },
    },
    getters: {
        inputData: state => state.inputData,
        method: state => state.inputData.method,
        fetchUrl: state => state.inputData.fetchUrl,
        requestBody: state => state.inputData.requestBody,
        requestHeaders: state => state.inputData.requestHeaders,
        response: state => state.response,
        snackBarState: state => state.snackBar.visible,
        snackBarText: state => state.snackBar.text,
        curlCode: state => state.curlCode,
        curlResponse: state => state.curlResponse,
        pksCreds: state => state.pksCreds,
        authResponse: state => state.authResponse
    },
    mutations: {
        setInputData(state, inputData){
            state.inputData = inputData;
        },
        addRequestHeader(state, {headerKey, headerValue}){
            state.inputData.requestHeaders = {
                ...state.inputData.requestHeaders,
                [headerKey]: headerValue
            }
        },
        deleteHeader(state, headerKey){
            const {requestHeaders} = state.inputData;
            delete requestHeaders[headerKey];
            state.inputData.requestHeaders = {
                ...requestHeaders
            };
        },
        setMethod(state, method){
            state.inputData.method = method;
        },
        setFetchUrl(state, fetchUrl){
            state.inputData.fetchUrl = fetchUrl;
        },
        setRequestBody(state, requestBody){
            state.inputData.requestBody = requestBody;
        },
        setResponse(state, response){
            state.response = response;
        },
        showSnackBar(state, text){
            state.snackBar = {
                visible: true,
                text,
            }
        },
        hideSnackBar(state){
            state.snackBar.visible = false;
        },
        setCurlCode(state, curlCode){
            state.curlCode = curlCode;
        },
        setCurlResponse(state, responseBody){
            console.log("new req", responseBody);
            state.curlResponse = responseBody;
        },
        setPksCreds(state, pksCreds){
            state.pksCreds = pksCreds;
        },
        setAuthResponse(state, responseBody){
            state.authResponse = responseBody;
        }
    },
    actions: {
        setInputData({commit}, inputData){
            commit('setInputData', inputData);
        },
        addRequestHeader({commit}, {headerKey, headerValue}){
            commit('addRequestHeader', {headerKey, headerValue});
        },
        deleteHeader({commit}, headerKey){
            commit('deleteHeader', headerKey);
        },
        setMethod({commit}, method){
            commit('setMethod', method)
        },
        setFetchUrl({commit}, fetchUrl){
            commit('setFetchUrl', fetchUrl);
        },
        setRequestBody({commit}, requestBody){
            commit('setRequestBody', requestBody);
        },
        setResponse({commit}, response){
            commit('setResponse', response);
        },
        showSnackBar({commit}, text){
            commit('showSnackBar', text);
        },
        hideSnackBar({commit}){
            commit('hideSnackBar');
        },
        setCurlResponse({commit}, responseBody){
            commit('setCurlResponse', responseBody);
        },
        setCurlCode({commit}, curlCode){
            commit('setCurlCode', curlCode);
        },
        setPksCreds({commit}, pksCreds){
            commit('setPksCreds', pksCreds);
        },
        setAuthResponse({commit}, responseBody){
            commit('setAuthResponse', responseBody);
        },
        executeCurlRequest,
        fetchResponse,
        getSavedRequest,
        saveRequest,
        executeAuthRequest
    }
});

export default store;