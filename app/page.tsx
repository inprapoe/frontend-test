"use client";
import { getGraph } from "@/actions/analyticAction";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import MessageBox from "@/components/MessageBox/MessageBox";
import Loading from "@/components/Loading/Loading";
import Card from "@/components/Card/Card";
import { motion } from "framer-motion"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const graphChartOptions = {
  responsive: true,
  tension: 0.5
};

export default function Home() {

  const [token, setToken] = useState<string| null>(null)
  const [graph, setGraph] = useState<{ loading: boolean, error?: string | number | null | undefined, data?: { counts: number[], dates: string[]} | null }>({ loading: true, error: null, data: null})

  const graphChartdata = {
    labels: graph?.data?.dates,
    datasets: [
      {
        label: 'Count',
        data: graph?.data?.counts,
        borderColor: '#1e40af',
        backgroundColor: '#1e40af50',
        fill: true
      },
    ],
  }

  useEffect(() => {
    if(!token) return
    async function  getGraphData() {
      setGraph({loading: true})
      const { err, data } = await getGraph(token)
      setGraph({ loading: false, error: err, data })
    }
    getGraphData()
  }, [token])

  return (
    <Layout 
      title={'Dashboard'}
      token={setToken}
    >
      {!graph.loading && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, translateY: 10 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
        >
          <Card className="w-full">
            {graph.loading ? (
              <Loading label={'Loading Graph Data'} />
            ) : graph.error ? (
              <MessageBox>
                {graph.error}
              </MessageBox>
            ) : (
              <div>
                <Line options={graphChartOptions} data={graphChartdata} />
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </Layout>
  )
}
