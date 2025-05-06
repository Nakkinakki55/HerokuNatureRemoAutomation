import axios from 'axios';

// Nature Remo APIを動作させる関数を定義
async function setAirconSettings() {
    const token = '<冬の朝をもっと快適に！Cloud Run×Cloud Scheduler×Nature Remoで実現するエアコン自動化プロジェクト で取得したトークン>'; // トークンを設定
	const deviceId = '<device_list.jsonで取得した登録している家電のID>'; // 家電のIDを設定
    const url = `https://api.nature.global/1/appliances/${deviceId}/aircon_settings`;
	// 送信するデータ
    const data = new URLSearchParams({
        operation_mode: 'warm',
        temperature: '24',
        temperature_unit: 'c',
        button: '',
        air_volume: 'auto',
        air_direction: 'auto',
        air_direction_h: 'auto',
    });

    try {
        // POSTリクエストを送信し、レスポンスを取得
        const response = await axios.post(
            url,
            data.toString(), // URLエンコードされたデータを送信
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // ステータスコードが200の場合、レスポンスのデータを出力
        if (response.status === 200) {
            console.log('Nature Remo送信成功!');
            console.log('Response data:', response.data);
        } else {
            console.error('Unexpected status code:', response.status);
        }
    } catch (error) {
        // エラーが発生した場合
        console.error('Error:', error.message);
    }
}

// 関数を呼び出し
setAirconSettings();
