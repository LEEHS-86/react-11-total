import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { FaCheck, FaTrash, FaPlus } from "react-icons/fa";

interface TodoItem {
    id: number;
    text: string;
    done: boolean;
}

const Wrap = styled.div`
    max-width: 520px;
    margin: 0 auto;
    padding: 48px 20px;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 800;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const Badge = styled.span`
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    background: ${({ theme }) => theme.primaryBg};
    color: ${({ theme }) => theme.primary};
`;

const InputCard = styled.form`
    display: flex;
    gap: 10px;
    padding: 10px;
    margin-bottom: 24px;
    background: ${({ theme }) => theme.cardBg};
    border: 1px solid ${({ theme }) => theme.hover};
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(30, 123, 224, 0.08);
    transition: box-shadow 0.2s;

    &:focus-within {
        box-shadow: 0 8px 28px rgba(30, 123, 224, 0.2);
    }
`;

const Input = styled.input`
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.text};
    font-size: 15px;
    outline: none;

    &::placeholder {
        color: ${({ theme }) => theme.subText};
    }
`;

const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #8b5cf6);
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition:
        transform 0.15s,
        box-shadow 0.15s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 14px rgba(139, 92, 246, 0.35);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    background: ${({ theme }) => theme.cardBg};
    border: 1px solid ${({ theme }) => theme.hover};
    border-radius: 18px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    transition:
        transform 0.15s,
        box-shadow 0.15s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
`;

const CheckButton = styled.button<{ $done: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid ${({ $done, theme }) => ($done ? "transparent" : theme.subText)};
    background: ${({ $done }) =>
        $done ? "linear-gradient(135deg, #34d399, #10b981)" : "transparent"};
    color: white;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    svg {
        opacity: ${({ $done }) => ($done ? 1 : 0)};
    }

    &:hover {
        border-color: #10b981;
    }
`;

const Text = styled.span<{ $done: boolean }>`
    flex: 1;
    font-size: 15px;
    color: ${({ theme }) => theme.text};
    text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
    opacity: ${({ $done }) => ($done ? 0.45 : 1)};
    transition: opacity 0.2s;
`;

const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: ${({ theme }) => theme.subText};
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        background: rgba(239, 68, 68, 0.12);
        color: #ef4444;
    }
`;

const Empty = styled.p`
    padding: 40px 0;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.subText};
`;

function Todo() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState<TodoItem[]>([]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text: input,
            done: false,
        };

        setTodos([...todos, newTodo]);
        setInput("");
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const remaining = todos.filter(todo => !todo.done).length;

    return (
        <Wrap>
            <Top>
                <Title>Todo List</Title>
                <Badge>남은 할 일 {remaining}개</Badge>
            </Top>

            <InputCard onSubmit={handleSubmit}>
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="오늘의 할 일을 입력하세요"
                />
                <AddButton type="submit">
                    <FaPlus />
                </AddButton>
            </InputCard>

            {todos.length === 0 ? (
                <Empty>아직 할 일이 없어요. 첫 번째 할 일을 추가해 보세요!</Empty>
            ) : (
                <List>
                    {todos.map(todo => (
                        <Item key={todo.id}>
                            <CheckButton $done={todo.done} onClick={() => toggleTodo(todo.id)}>
                                <FaCheck />
                            </CheckButton>
                            <Text $done={todo.done}>{todo.text}</Text>
                            <DeleteButton onClick={() => deleteTodo(todo.id)}>
                                <FaTrash />
                            </DeleteButton>
                        </Item>
                    ))}
                </List>
            )}
        </Wrap>
    );
}

export default Todo;
