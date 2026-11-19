import { useState, useEffect } from "react";
import styled from "styled-components";

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            market_cap: number;
            percent_change_24h: number;
        };
    };
}

// 전체 화면을 감싸는 박스 (왼쪽 목록 + 오른쪽 상세를 옆으로 나란히 배치)
const Container = styled.div`
    max-width: 1100px;
    margin: 30px auto;
    padding: 0 20px;
    display: flex;
    gap: 20px;
`;

// 왼쪽 코인 목록 박스
const Sidebar = styled.div`
    width: 320px;
    height: 70vh;
    overflow-y: auto;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.3);
`;

// 목록 안의 코인 한 줄 (선택됐을 때만 보라/핑크 그라데이션)
const CoinItem = styled.div<{ $isSelected: boolean }>`
    display: flex;
    justify-content: space-between;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 10px;
    cursor: pointer;
    background: ${({ $isSelected }) =>
        $isSelected ? "linear-gradient(135deg, #4f46e5, #ec4899)" : "rgba(148, 163, 184, 0.1)"};
    color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "inherit")};
`;

// 오른쪽 상세 영역
const DetailArea = styled.div`
    flex: 1;
`;

// 상단 대표 배너
const HeroBanner = styled.div`
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 20px;
    color: #ffffff;
    background: linear-gradient(135deg, #4f46e5, #9333ea, #ec4899);
`;

// 아래 통계 카드 4개를 2줄로 배치 (2개씩 가로 나열)
const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`;

// 통계 카드 1개
const StatCard = styled.div`
    padding: 20px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.3);
`;

export default function Coin() {
    const [coins, setCoins] = useState<CoinData[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch("https://api.coinpaprika.com/v1/tickers?limit=50");
                const data: CoinData[] = await res.json();
                setCoins(data);
                if (data.length > 0) {
                    setSelectedCoin(data[0]);
                }
            } catch (err) {
                console.error("코인 데이터 로딩 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        void fetchCoins();
    }, []);

    if (loading) {
        return <div style={{ padding: "40px", textAlign: "center" }}>불러오는 중...</div>;
    }

    return (
        <Container>
            <Sidebar>
                <h3>Top 50 Coins</h3>
                {coins.map(coin => {
                    const isSelected = selectedCoin?.id === coin.id;
                    const change = coin.quotes.USD.percent_change_24h;

                    return (
                        <CoinItem
                            key={coin.id}
                            $isSelected={isSelected}
                            onClick={() => setSelectedCoin(coin)}>
                            <div>
                                <div>
                                    <strong>{coin.name}</strong>
                                </div>
                                <small>{coin.symbol}</small>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div>${coin.quotes.USD.price.toFixed(2)}</div>
                                <small>{change.toFixed(2)}%</small>
                            </div>
                        </CoinItem>
                    );
                })}
            </Sidebar>

            <DetailArea>
                {selectedCoin && (
                    <>
                        <HeroBanner>
                            <div>RANK #{selectedCoin.rank}</div>
                            <h1>
                                {selectedCoin.name} ({selectedCoin.symbol})
                            </h1>
                            <div>
                                24시간 변동률:{" "}
                                {selectedCoin.quotes.USD.percent_change_24h.toFixed(2)}%
                            </div>
                        </HeroBanner>

                        <StatsGrid>
                            <StatCard>
                                <div>현재 가격 (USD)</div>
                                <h2>${selectedCoin.quotes.USD.price.toFixed(2)}</h2>
                            </StatCard>

                            <StatCard>
                                <div>시가총액</div>
                                <h2>${selectedCoin.quotes.USD.market_cap.toLocaleString()}</h2>
                            </StatCard>

                            <StatCard>
                                <div>24시간 거래량</div>
                                <h2>${selectedCoin.quotes.USD.volume_24h.toLocaleString()}</h2>
                            </StatCard>

                            <StatCard>
                                <div>시가총액 순위</div>
                                <h2>{selectedCoin.rank}위</h2>
                            </StatCard>
                        </StatsGrid>
                    </>
                )}
            </DetailArea>
        </Container>
    );
}
