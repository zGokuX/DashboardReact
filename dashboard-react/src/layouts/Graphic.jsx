import Highcharts from 'highcharts'
import { Chart, Title, XAxis, YAxis, Series } from '@highcharts/react'
import { useMemo } from 'react'

export default function Graphic(props) {

  const categories = useMemo(() => {
    console.log(props);
    if (!props.productsList || props.productsList.length === 0) {
      return []
    }
    return props.productsList.reduce((acc, item) => {
        console.log(item);
      if (acc[item.category] === undefined) {
        acc[item.category] = []
        acc[item.category].push(item.price)
      } else {
        acc[item.category].push(item.price)
      }
      return acc
    }, {})
  }, [props.productsList])


  console.log(categories )

  return (
    <>
      <div className='statistica container-full-width'>
        <div className='card'>
          <div className='card-title'>
            <div className='card-actions'>
              <button className='card-action-button project-btn'>
                <i className='fa-solid fa-folder'></i>
              </button>
            </div>
          </div>

          <div className='card-content'>
            <div className='card-graphic'>
              <div className='text-in-card'>
                <span id='number-expires'>5</span>
              </div>
              <Chart highcharts={Highcharts}>
                <Title>Media costo categoria</Title>

                <XAxis categories={Object.keys(categories)} />

                <YAxis>
                  <Title>Media costo</Title>
                </YAxis>

                <Series
                  type='column'
                  name='2026'
                  data={Object.values(categories).map(item => item.reduce((acc, price) => acc + price, 0) / item.length)}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-title'>
            <div className='card-actions'>
              <button className='card-action-button revenue-per-month'>
                <i className='fa-solid fa-arrow-up'></i>
                <span></span>18.5%
              </button>
            </div>
          </div>

          <div className='card-content'>
            <div className='card-graphic'>
              <div className='text-in-card'>
                <span className='big'>€12.750</span>
              </div>
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
