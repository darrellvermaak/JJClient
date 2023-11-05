import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { BACKEND_BASE_URL, BACKEND_HOST, BACKEND_PORT, BACKEND_PROTOCOL } from '../../constants';

@Injectable({ providedIn: 'root' })
export class DirPathService {
    constructor(
        private http: HttpClient
    ) {}

    public SubmitDirPath(
        dirpath: string,
        fromIndex: number,
        toIndex: number
    ) {
        let body = {
            "fromIndex": fromIndex,
            "toIndex": toIndex,
            "dirPath": dirpath
        };
        return this.http.post(`${BACKEND_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}${BACKEND_BASE_URL}/dirpath`, body);
    }
}
