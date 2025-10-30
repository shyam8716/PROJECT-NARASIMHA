import React from 'react'
import api from '../api/axios'

const CalculatorPage = () => {
  const buttons = ["1","2","3","4","5","6","7","8","9","0","=","X","AC"];

  return (
    <div style={styles.container}>
      <h1>This is standard page</h1>

      <div style={styles.grid}>
        {buttons.map((btn) => (
          <button key={btn} style={styles.btn}>{btn}</button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { textAlign: "center", padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 90px)",
    gap: "12px",
    justifyContent: "center",
    marginTop: "20px",
  },

  btn: {
    padding: "18px",
    borderRadius: "10px",
    fontSize: "22px",
    cursor: "pointer",
    border: "1px solid #333",
    background: "#f8f9fa"
  }
}

export default CalculatorPage
