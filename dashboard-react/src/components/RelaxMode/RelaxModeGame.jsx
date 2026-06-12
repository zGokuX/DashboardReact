import { useEffect, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '@/components/RelaxMode/RelaxModeStyle.css'

function createMachine(config) {
  return {
    ...config,

    getNextItemPrice(state) {
      return Math.floor(
        config.basePrice * Math.pow(config.priceGrowth, state.count),
      )
    },

    getNextUpgradePrice(state) {
      return Math.floor(
        config.baseUpgradePrice * Math.pow(config.upgradeGrowth, state.level),
      )
    },

    getProductionSpeed(state) {
      return config.baseSpeed * (state.level + 1)
    },

    getIncomePerItem() {
      return config.baseIncome
    },

    getTotalIncome(state) {
      return (
        state.count * this.getIncomePerItem(state) * this.getProductionSpeed(state)
      )
    },
  }
}

const machines = [
  createMachine({
    id: 'cursor',
    name: 'Cursore',
    icon: '📌',
    packageIcon: '📦',
    basePrice: 10,
    priceGrowth: 1.18,
    baseUpgradePrice: 25,
    upgradeGrowth: 1.25,
    baseIncome: 0.2,
    baseSpeed: 1,
  }),

  createMachine({
    id: 'machine',
    name: 'Apparato',
    icon: '🔨',
    packageIcon: '📦',
    basePrice: 100,
    priceGrowth: 1.22,
    baseUpgradePrice: 150,
    upgradeGrowth: 1.28,
    baseIncome: 2,
    baseSpeed: 0.8,
  }),

  createMachine({
    id: 'factory',
    name: 'Fabbrica',
    icon: '🏭',
    packageIcon: '📦',
    basePrice: 1000,
    priceGrowth: 1.25,
    baseUpgradePrice: 1200,
    upgradeGrowth: 1.3,
    baseIncome: 15,
    baseSpeed: 0.5,
  }),
]

const initialMachineState = {
  cursor: { count: 0, level: 0 },
  machine: { count: 0, level: 0 },
  factory: { count: 0, level: 0 },
}

function formatNumber(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(2)}K`
  return value.toFixed(value % 1 === 0 ? 0 : 1)
}

export default function RelaxMode() {
  const [score, setScore] = useState(1000)
  const [machineState, setMachineState] = useState(initialMachineState)

  const totalIncome = useMemo(
    () =>
      machines.reduce((sum, machine) => {
        return sum + machine.getTotalIncome(machineState[machine.id])
      }, 0),
    [machineState],
  )

  useEffect(() => {
    if (totalIncome <= 0) return undefined

    const incomeTimer = setInterval(() => {
      setScore((prev) => prev + totalIncome)
    }, 1000)

    return () => clearInterval(incomeTimer)
  }, [totalIncome])

  function buyItem(machineId) {
    const machine = machines.find((item) => item.id === machineId)

    if (!machine) return

    const state = machineState[machineId]
    const price = machine.getNextItemPrice(state)

    if (score < price) {
        console.error("No funds")
        return
    }

    setScore((prev) => prev - price)

    setMachineState((prev) => ({
      ...prev,
      [machineId]: {
        ...prev[machineId],
        count: prev[machineId].count + 1,
      },
    }))
  }

  function buyUpgrade(machineId) {
    const machine = machines.find((item) => item.id === machineId)
    if (!machine) return

    const state = machineState[machineId]
    const price = machine.getNextUpgradePrice(state)

    if (score < price) return

    setScore((prev) => prev - price)

    setMachineState((prev) => ({
      ...prev,
      [machineId]: {
        ...prev[machineId],
        level: prev[machineId].level + 1,
      },
    }))
  }

  return (
    <div className='container-relax d-flex flex-column gap-4 '>
      <div className='UpBar ps-5 pt-2 pe-3 d-flex justify-content-between text-light fs-4'>
        <div className='money d-flex align-items-center rounded ps-3 pt-2 pe-5'>
          <div className='icon text-success fs-2'>
            <i className='fa-regular fa-money-bill-1 me-2'></i>
          </div>
          <div className='textNumber'>
            <span className='fs-3'>{formatNumber(score)}</span>
            <p className='text-secondary'>CREDITI</p>
          </div>
        </div>
        <div className='d-flex shop'>
          <Button className='logout ms-2 rounded fs-4'>
            <Link className='leave' to='/'>
              <p className='mb-0'>ESCI</p>
            </Link>
          </Button>
        </div>
      </div>

      {machines.map((machine) => {
        const state = machineState[machine.id]
        const nextItemPrice = machine.getNextItemPrice(state)
        const nextUpgradePrice = machine.getNextUpgradePrice(state)
        const incomePerItem = machine.getIncomePerItem(state)
        const productionSpeed = machine.getProductionSpeed(state)
        const machineIncome = machine.getTotalIncome(state)

        return (
          <div className='chiodi-container ps-5 d-flex' key={machine.id}>
            <div className='chiodi-card'>
              <div className='chiodi-title'>
                <span>{machine.name}</span>
              </div>
              <div className='d-flex justify-content-center chiodi-emoji'>
                {machine.icon}
              </div>
              <div className='chiodi-level'>LIV.{state.level}</div>
            </div>

            <div className='produzione'>
              <div className='produzione-title d-flex gap-5'>
                <span id='text-produzione'>PRODUZIONE DI CHIODI</span>
                <span id='money-per-sec'>{formatNumber(machineIncome)}/SEC</span>
              </div>
              <div className='progress-bar'>
                <progress className='start'></progress>
              </div>

              <div className='sell d-flex'>
                <span style={{ fontSize: '3rem' }}>{machine.packageIcon}</span>
                <div className='title '>
                  <p className='m-0 magazzino'>MAGAZZINO CHIODI</p>
                  <p className='money-text'>{formatNumber(score)}</p>
                </div>

                <div className='button-sell d-flex flex-column'>
                  <p className='m-0'>DOPO 1 SEC</p>
                  <p>{formatNumber(totalIncome)} CREDITI</p>
                </div>
              </div>
            </div>

            <div className='actions'>
              <button
                className='action upgrade'
                disabled={score < nextUpgradePrice}
                onClick={() => buyUpgrade(machine.id)}
              >
                <span className='ico'>UP</span>
                <span className='txt'>
                  Migliora
                  <br />
                  {formatNumber(nextUpgradePrice)} CREDITI
                </span>
              </button>
              <button
                className='action buy'
                disabled={score < nextItemPrice}
                onClick={() => buyItem(machine.id)}
              >
                <span className='ico'>+1</span>
                <span className='txt'>
                  +1 {machine.name}
                  <br />
                  {formatNumber(nextItemPrice)} CREDITI
                </span>
              </button>
              <div className='count'>
                {machine.name}
                <br />
                {state.count} pezzi
                <br />
                {formatNumber(productionSpeed)}/SEC velocita
                <br />
                {formatNumber(incomePerItem)} CREDITI cadauno
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
