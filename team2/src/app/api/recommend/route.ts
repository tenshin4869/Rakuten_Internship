import { NextRequest, NextResponse } from "next/server";
import { get_genre_data } from "../../utils/dbUtils";

interface User_Data {
    UID: string;
}

const applicationId = '1002458784990984598';

async function searchRakutenItems(keyword: string): Promise<Response> {
    const url = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';
    const randomINT = Math.floor(Math.random() * (100 - 1 + 1)) + 1
    const params = new URLSearchParams({
            applicationId: applicationId,
            keyword: keyword,
            hits: '1',
            availability: '1',
            page: randomINT.toString()
    });

    try {
            const Url_ = url + '?' + params.toString();
            console.log(Url_);
            const response = await fetch(`${url}?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
    }
    catch (error) {
            console.error('Error:', error);
    }
    return new Response('Error', { status: 500 });
}

function getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

async function get_insufficient_data(user: User_Data) {
    // ユーザーのデータから不足しているジャンルを取得
    const insufficient_genre = await get_genre_data();
    const insufficient_data: string = getRandomElement(insufficient_genre);
    return insufficient_data;
}

export async function POST(request: NextRequest) {
    const user: User_Data = await request.json();
    // UIDからグッズのデータを取得（グッズのジャンル情報がないため未実現）
    //　不足しているジャンルに対して、おすすめのグッズを取得
    const insufficient_data: string = await get_insufficient_data(user);
    const res = await searchRakutenItems(insufficient_data);
    const data = await res.json();    
    return NextResponse.json(data);
}