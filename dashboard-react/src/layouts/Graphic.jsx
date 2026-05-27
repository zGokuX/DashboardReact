import Highcharts from 'highcharts'
import { Chart, Title, XAxis, YAxis, Series } from '@highcharts/react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '@/store/slices/productsSlice'
export default function Graphic() {

  const productList = useSelector(selectProducts)
  const date = new Date()
  const message = "Media calcolata nell'arco del " + date.getFullYear()

  const categories = useMemo(() => {
    if (!productList || productList.length === 0) {
      return []
    }
    return productList.reduce((acc, item) => {
      if (acc[item.category] === undefined) {
        acc[item.category] = []
        acc[item.category].push(item.price)
      } else {
        acc[item.category].push(item.price)
      }
      return acc
    }, {})
  }, [productList])

  return (
    <>
      <div className='statistica container-full-width'>
        <div className='card'>

          <div className='card-content'>
            <div className='card-graphic'>
              <Chart highcharts={Highcharts}>
                <Title>Media costo categoria</Title>

                <XAxis categories={Object.keys(categories)} />

                <YAxis>
                  <Title>Media costo</Title>
                </YAxis>

                <Series
                  type='column'
                  name={message}
                  data={Object.values(categories).map(item => item.reduce((acc, price) => acc + price, 0) / item.length)}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className='card'>

          <div className='card-content'>
            <div className='card-graphic'>
              <Chart highcharts={Highcharts}>
                <Title>Somma dei costi per categoria</Title>

                <Series
                  type='pie'
                  name='Percentuale'
                  data={Object.entries(categories).map(([category_name, prices]) => ({
                    name: category_name,
                    y: prices.map(price => price).reduce((acc, price) => acc + price, 0)
                  }))}

                />
              </Chart>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
