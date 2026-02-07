import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../services/api";
import VirtualizedList from "../components/VirtualizedList";

const Page = styled.div`
  background: #f4f6f8;
  min-height: 100vh;
  padding: 24px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #1f2937;
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const CardLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const CardValue = styled.div`
  margin-top: 6px;
  font-size: 22px;
  font-weight: 600;
  color: #111827;
`;

const Content = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get("/data/latest");

        const parsedData = res.data.map((item) => ({
          ...item,
          payload:
            typeof item.payload === "string"
              ? JSON.parse(item.payload)
              : item.payload,
        }));

        setData(parsedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Page><Title>Loading dashboard...</Title></Page>;
  if (error) return <Page><Title>{error}</Title></Page>;

  const latest = data[0];

  return (
    <Page>
      <Title>Real-Time Data Dashboard</Title>

      <MetricsRow>
        <Card>
          <CardLabel>Total Records</CardLabel>
          <CardValue>{data.length}</CardValue>
        </Card>

        <Card>
          <CardLabel>Latest Sensor</CardLabel>
          <CardValue>{latest?.payload?.sensor || "-"}</CardValue>
        </Card>

        <Card>
          <CardLabel>Latest Status</CardLabel>
          <CardValue>{latest?.payload?.status || "-"}</CardValue>
        </Card>
      </MetricsRow>

      <Content>
        <VirtualizedList data={data} />
      </Content>
    </Page>
  );
}
