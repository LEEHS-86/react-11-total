import { Link } from "react-router-dom";
import styled from "styled-components";
import type { ReactNode } from "react";
import { FaBitcoin, FaBook, FaCheckSquare, FaRegClipboard, FaArrowRight, FaSpaceShuttle } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";


interface CardInfo {
    to: string;
    title: string;
    desc: string;
    icon: ReactNode;
    color: string; // 아이콘 배경 그라데이션
}

const cards: CardInfo[] = [
    {
        to: "/todo",
        title: "투두리스트",
        desc: "체계적인 일정 관리와 할 일 목록 기록",
        icon: <FaCheckSquare />,
        color: "linear-gradient(135deg, #34d399, #059669)",
    },
    {
        to: "/coin",
        title: "코인트래커",
        desc: "실시간 가상화폐 시세 확인 및 정보 트래킹",
        icon: <FaBitcoin />,
        color: "linear-gradient(135deg, #fbbf24, #f97316)",
    },
    {
        to: "/movie",
        title: "무비검색앱",
        desc: "영화 데이터베이스 API를 활용한 영화 검색",
        icon: <BiSolidCameraMovie />,
        color: "linear-gradient(135deg, #f472b6, #e11d48)",
    },
    {
        to: "/board",
        title: "게시판",
        desc: "기본적인 커뮤니티 게시판",
        icon: <FaRegClipboard />,
        color: "linear-gradient(135deg, #38bdf8, #2563eb)",
    },
    {
        to: "/board",
        title: "로켓앱",
        desc: "스페이스X의 로켓발사 상태 및 상세 정보 조회",
        icon: <FaSpaceShuttle />,
        color: "linear-gradient(135deg, #38bdf8, #2563eb)",
    },
    {
        to: "/book",
        title: "구글북스 검색앱",
        desc: "구글 도서 데이터를 활용한 온라인 책 검색",
        icon: <FaBook />,
        color: "linear-gradient(135deg, #a78bfa, #6d28d9)",
    },
];

const Wrap = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
`;

const Hero = styled.section`
    position: relative;
    overflow: hidden;
    padding: 56px 48px;
    margin-bottom: 32px;
    border-radius: 28px;
    color: white;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3);

    /* 장식용 동그라미 두 개 */
    &::before {
        content: "";
        position: absolute;
        top: -80px;
        right: -60px;
        width: 260px;
        height: 260px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -110px;
        right: 180px;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
    }
`;

const HeroBadge = styled.span`
    position: relative;
    display: inline-block;
    padding: 6px 14px;
    margin-bottom: 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.2);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
    position: relative;
    margin-bottom: 10px;
    font-size: 42px;
    font-weight: 800;
`;

const HeroText = styled.p`
    position: relative;
    font-size: 16px;
    opacity: 0.9;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
`;

const Card = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 28px;
    background: ${({ theme }) => theme.cardBg};
    border: 1px solid ${({ theme }) => theme.hover};
    border-radius: 22px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.14);
    }

    &:hover {
        opacity: 1;
        transform: translateX(0);
    }
`;

const IconBox = styled.div<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    margin-bottom: 18px;
    border-radius: 16px;
    background: ${({ $color }) => $color};
    color: white;
    font-size: 26px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
`;

const CardTitle = styled.h3`
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
`;

const CardDesc = styled.p`
    font-size: 13px;
    line-height: 1.5;
    color: ${({ theme }) => theme.subText};
`;

const Arrow = styled.span`
    position: absolute;
    top: 30px;
    right: 28px;
    color: ${({ theme }) => theme.primary};
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.2s;
`;

function Home() {
    return (
        <Wrap>
            <Hero>
                <HeroBadge>PORTFOLIO</HeroBadge>
                <HeroTitle>My Project Dashboard</HeroTitle>
                <HeroText>지금까지 구축한 포트폴리오 리스트입니다.</HeroText>
            </Hero>
            <Grid>
                {cards.map(card => (
                    <Card key={card.to} to={card.to}>
                        <IconBox $color={card.color}>{card.icon}</IconBox>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDesc>{card.desc}</CardDesc>
                        <Arrow className="arrow">
                            <FaArrowRight />
                        </Arrow>
                    </Card>
                ))}
            </Grid>
        </Wrap>
    );
}

export default Home;
