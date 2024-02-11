import { useEffect, useState } from 'react'

enum FieldTypeList {
  'a' = 'a',
  'b' = 'b',
  'c' = 'c'
}

interface EquationSolverProps {
  content: object
  setContent: React.Dispatch<React.SetStateAction<object>>
}

// eslint-disable-next-line react/prop-types
export const EquationSolver: React.FC<EquationSolverProps> = ({ content, setContent }) => {
  const [aInput, setAInput] = useState<number | string>(0)
  const [bInput, setBInput] = useState<number | string>(0)
  const [cInput, setCInput] = useState<number | string>(0)

  const [solution, setSolution] = useState<string | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)
  useEffect(() => {
    if (aInput === '' || aInput === 0) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }, [aInput])

  useEffect(() => {
    if (Object.keys(content).length === 0) {
      setIsActive(false)
      setAInput(0)
      setBInput(0)
      setCInput(0)
      setSolution(null)
    }
  }, [content])

  const clickHandler = () => {
    const a = parseFloat(String(aInput))
    const b = parseFloat(String(bInput))
    const c = parseFloat(String(cInput))
    const discriminant = b * b - 4 * a * c
    let roots: { x1: number; x2: number } | null = null

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
      roots = { x1, x2 }
      setSolution(`Roots are real and different. Roots: x1 = ${x1}, x2 = ${x2}`)
    } else if (discriminant == 0) {
      const x = -b / (2 * a)
      roots = { x1: x, x2: x }
      setSolution(`Roots are real and same. Roots: x1 = ${x}, x2 = ${x}`)
    } else if (discriminant < 0) {
      setSolution('No real roots.')
    }
    const newContent = {
      a: aInput,
      b: bInput,
      c: cInput,
      discriminant: discriminant,
      solution: solution,
      roots: roots
    }
    setContent(newContent)
    console.log(content)
  }
  const changeHandler = ({ value, type }: { value: string; type: FieldTypeList }) => {
    console.log('ainput:', aInput)
    console.log('binput', bInput)
    console.log('cinpuit', cInput)
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      switch (type) {
        case FieldTypeList.a:
          setAInput(numericValue)
          break
        case FieldTypeList.b:
          setBInput(numericValue)
          break
        case FieldTypeList.c:
          setCInput(numericValue)
          break
      }
    } else {
      switch (type) {
        case FieldTypeList.a:
          setAInput('')
          break
        case FieldTypeList.b:
          setBInput('')
          break
        case FieldTypeList.c:
          setCInput('')
          break
      }
    }
  }

  return (
    <div className="mt-10 flex justify-center items-center">
      <div className="flex items-left justify-center flex-col">
        <label className="text-md text-blue-950">A:</label>
        <input
          className="mb-2 pl-2 bg-slate-200 border border-gray-400 text-gray-900 text-md rounded-md [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={aInput}
          onChange={(e) => {
            changeHandler({
              value: e.target.value,
              type: FieldTypeList.a
            })
          }}
        />
        <label className="text-md text-blue-950">B:</label>
        <input
          className="mb-2 pl-2 bg-slate-200 border border-gray-400 text-gray-900 text-md rounded-md [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={bInput}
          onChange={(e) => {
            changeHandler({
              value: e.target.value,
              type: FieldTypeList.b
            })
          }}
        />
        <label className="text-md text-blue-950">C:</label>
        <input
          className="mb-2 pl-2 bg-slate-200 border border-gray-400 text-gray-900 text-md rounded-md [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={cInput}
          onChange={(e) => {
            changeHandler({
              value: e.target.value,
              type: FieldTypeList.c
            })
          }}
        />
      </div>
      <div className="ml-20 flex items-center flex-col ">
        <span className="mb-5 text-2xl text-blue-950">Your equation looks like this:</span>
        <div className="text-blue-950 flex items-top">
          <span className="text-4xl ">{aInput === '' || bInput === null ? 'a' : aInput}x</span>
          <span className="text-xl">2</span>
          <span className="text-4xl ">
            +{bInput === '' || bInput === null ? 'b' : bInput}x+
            {cInput === '' || cInput === null ? 'c' : cInput}=0
          </span>
        </div>
        <button
          className="mt-5 py-1 px-10 bg-slate-200 border border-gray-400 text-gray-900 text-md
          rounded-md
          disabled:opacity-75"
          onClick={clickHandler}
          disabled={!isActive}
        >
          Solve!
        </button>
        {solution && <div className="text-lg mt-4 text-blue-950">{solution}</div>}
      </div>
    </div>
  )
}
