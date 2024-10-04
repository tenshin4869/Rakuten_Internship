import { NextResponse } from 'next/server';

const RAKUTEN_API_ENDPOINT = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    // キーワードをここで入力
    const keyword = searchParams.get('keyword') || '防災グッズ';
    // .envファイルからRAKUTEN_APP_IDを取得
    const appId = process.env.RAKUTEN_APP_ID　;
    console.log('RAKUTEN_APP_ID:', process.env.RAKUTEN_APP_ID);

    // .envファイルにRAKUTEN_APP_IDが設定されていない場合はエラーを返す
    if (!appId) {
        console.error('Rakuten Application IDが設定されていません。');
        return NextResponse.json({ error: 'Rakuten Application IDが設定されていません。' }, { status: 500 });
    }

    // URLを作成
    const url = `${RAKUTEN_API_ENDPOINT}?applicationId=${appId}&keyword=${encodeURIComponent(keyword)}&hits=20`;

    try {
        const response = await fetch(url);
        // レスポンスが正常に返されなかった場合はエラーを返す
        if (!response.ok) {
            throw new Error(`Rakuten API でエラーが発生しました。　status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Rakuten APIからのデータ取得に成功しました。');
        return NextResponse.json(data);
    } catch (error) {
        console.error('プロダクトの取得に失敗しました。', error);
        return NextResponse.json({ error: 'プロダクトの取得に失敗しました。', details: error }, { status: 500 });
    }
}