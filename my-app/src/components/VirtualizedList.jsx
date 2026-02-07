import React, { useState } from "react";
import styled from "styled-components";

const VIEWPORT_HEIGHT = 500;
const ITEM_HEIGHT = 120;

const Container = styled.div`
  height: ${VIEWPORT_HEIGHT}px;
  overflow-y: auto;
  position: relative;
`;

const Spacer = styled.div`
  height: ${(props) => props.height}px;
  position: relative;
`;

const ItemCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #3b82f6;
`;

export default function VirtualizedList({ data }) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + 2;
  const visibleItems = data.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <Container onScroll={(e) => setScrollTop(e.target.scrollTop)}>
      <Spacer height={data.length * ITEM_HEIGHT}>
        {visibleItems.map((item, index) => (
          <ItemCard
            key={item.id}
            style={{
              top: (startIndex + index) * ITEM_HEIGHT
            }}
          >
            <div><strong>ID:</strong> {item.id}</div>
            <div><strong>Source:</strong> {item.source_id}</div>
            <div><strong>Time:</strong> {new Date(item.received_at).toLocaleString()}</div>
            <pre>{JSON.stringify(item.payload, null, 2)}</pre>
          </ItemCard>
        ))}
      </Spacer>
    </Container>
  );
}
