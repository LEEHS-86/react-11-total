import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBitcoin, FaBook, FaCheckSquare, FaRegClipboard, FaSpaceShuttle } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
interface HeaderProps {
    isDark: boolean;
    onToggle: () => void;
}

const HeaderWrap = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 60px;
    background: ${({ theme }) => theme.headerBg};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;
const Logo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
`;
const Nav = styled.nav`
    display: flex;
    gap: 8px;
`;
const Menu = styled(Link)`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.subText};

    &:hover {
        background: ${({ theme }) => theme.hover};
    } 
    &:active {
        background: ${({ theme }) => theme.primaryBg};
        color: ${({ theme }) => theme.primary};
        font-weight: 600;
    }
`;

const ThemeButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
`;

function Header({ isDark, onToggle }: HeaderProps) {
    return (
        <HeaderWrap>
            <Logo to="/">
                <FaSpaceShuttle /> My Universe
            </Logo>
            <Nav>
                <Menu to="/">Home</Menu>
                <Menu to="/todo">
                    <FaCheckSquare />
                    Todo
                </Menu>
                <Menu to="/coin">
                    <FaBitcoin />
                    Coin
                </Menu>
                <Menu to="/movie">
                    <BiSolidCameraMovie />
                    Movie
                </Menu>
                <Menu to="/board">
                    <FaRegClipboard />
                    Board
                </Menu>
                <Menu to="/board">
                    <FaSpaceShuttle />
                    Rocket
                </Menu>
                <Menu to="/book">
                    <FaBook /> Book
                </Menu>
            </Nav>
            <ThemeButton onClick={onToggle}>{isDark ? "라이트" : "다크"}</ThemeButton>
        </HeaderWrap>
    );
}

export default Header;
