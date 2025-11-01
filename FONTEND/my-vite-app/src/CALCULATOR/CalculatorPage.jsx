import React, { useState, useEffect } from "react";
import api from "../api/axios";
const API_BASE = "http://127.0.0.1:8000/calculators/";
const ambient = {
  darkBg: "linear-gradient(180deg, #050814, #0B0E26)",
  lightBg: "linear-gradient(180deg, #f0f6ff, #dce7ff)",
  darkBtn: "linear-gradient(145deg, #0B0E26, #1A1446)",
  lightBtn: "linear-gradient(145deg, #e3ecff, #c9d9ff)",
  darkGlow: "0 0 10px #00f6ff, 0 0 20px #00e6ff, 0 0 30px #00ccff",
  lightGlow: "0 0 6px #00bfff, 0 0 12px #0099ff, 0 0 18px #0066ff",
  neonText: "#00f6ff",
  lightText: "#002244",
};
const numbers = ["7","8","9","4","5","6","1","2","3","0",".","⌫"];
const ops = ["+","-","*","/","//","%"];
const mapOp = { "+":"ADD","-":"SUB","*":"MUL","/":"DIV","//":"FLOOR","%":"MOD" };
const revOp = { ADD:"+", SUB:"-", MUL:"*", DIV:"/", FLOOR:"//", MOD:"%" };
const numberColors = {
  "0": { light: "#00ffff", dark: "#00cccc", glowLight: "0 0 10px #00ffff", glowDark: "0 0 15px #00cccc" },
  "1": { light: "#ff00ff", dark: "#cc00cc", glowLight: "0 0 10px #ff00ff", glowDark: "0 0 15px #cc00cc" },
  "2": { light: "#ffff00", dark: "#cccc00", glowLight: "0 0 10px #ffff00", glowDark: "0 0 15px #cccc00" },
  "3": { light: "#00ff00", dark: "#00cc00", glowLight: "0 0 10px #00ff00", glowDark: "0 0 15px #00cc00" },
  "4": { light: "#ff6600", dark: "#cc5200", glowLight: "0 0 10px #ff6600", glowDark: "0 0 15px #cc5200" },
  "5": { light: "#ff0066", dark: "#cc0052", glowLight: "0 0 10px #ff0066", glowDark: "0 0 15px #cc0052" },
  "6": { light: "#00ff66", dark: "#00cc52", glowLight: "0 0 10px #00ff66", glowDark: "0 0 15px #00cc52" },
  "7": { light: "#ffcc00", dark: "#cc9900", glowLight: "0 0 10px #ffcc00", glowDark: "0 0 15px #cc9900" },
  "8": { light: "#66ffcc", dark: "#33cc99", glowLight: "0 0 10px #66ffcc", glowDark: "0 0 15px #33cc99" },
  "9": { light: "#cc00ff", dark: "#9900cc", glowLight: "0 0 10px #cc00ff", glowDark: "0 0 15px #9900cc" },
  ".": { light: "#00ffff", dark: "#00cccc", glowLight: "0 0 10px #00ffff", glowDark: "0 0 15px #00cccc" },
  "⌫": { light: "#ff3333", dark: "#cc0000", glowLight: "0 0 10px #ff3333", glowDark: "0 0 15px #cc0000" }
};
const opColors = {
  "+": { light: "#00ffff", dark: "#00cccc", glowLight: "0 0 10px #00ffff", glowDark: "0 0 15px #00cccc" },
  "-": { light: "#ff9900", dark: "#cc7a00", glowLight: "0 0 12px #ff9900", glowDark: "0 0 18px #cc7a00" },
  "*": { light: "#ffff00", dark: "#cccc00", glowLight: "0 0 10px #ffff00", glowDark: "0 0 15px #cccc00" },
  "/": { light: "#00ff00", dark: "#00cc00", glowLight: "0 0 10px #00ff00", glowDark: "0 0 15px #00cc00" },
  "//": { light: "#ff6600", dark: "#cc5200", glowLight: "0 0 10px #ff6600", glowDark: "0 0 15px #cc5200" },
  "%": { light: "#ff0066", dark: "#cc0052", glowLight: "0 0 10px #ff0066", glowDark: "0 0 15px #cc0052" }
};
const specialColors = {
  "=": { light: "#00ff00", dark: "#00cc00", glowLight: "0 0 12px #00ff00, 0 0 20px #00cc00", glowDark: "0 0 15px #00cc00, 0 0 25px #009900" },
  "AC": { light: "#ff0000", dark: "#cc0000", glowLight: "0 0 12px #ff3333, 0 0 20px #cc0000", glowDark: "0 0 15px #cc0000, 0 0 25px #990000" }
};
const RealisticCalculator = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState(null);
  const [last, setLast] = useState("");
  const [active, setActive] = useState("num1");
  const [history, setHistory] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showHis, setShowHis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [editData, setEditData] = useState({ id:null, number1:"", number2:"", operation:"+" });
  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API_BASE}Reading_calculator_data/`);
      setHistory(res.data);
    } catch(e) { console.log(e); }
    setLoading(false);
  };
  useEffect(()=>{ loadHistory(); }, []);
  const saveCalculation = async (n1,n2,o,result)=>{
    try{
      await api.post(`${API_BASE}Creating_calculator_data/`, {
        number1:parseFloat(n1),
        number2:parseFloat(n2),
        operation:mapOp[o],
        result:parseFloat(result)
      });
      loadHistory();
    }catch(e){console.log(e);}
  };
  const deleteOne = async (id)=>{ 
    try{
      await api.delete(`${API_BASE}Deleteing_calculator_data/${id}/`); 
      setHistory(h=>h.filter(x=>x.id!==id)); 
    }catch(e){console.log(e);}
  };
  const calculate = (a,b,o)=>{ 
    a=parseFloat(a)||0; b=parseFloat(b)||0; 
    if(o==="+")return a+b; 
    if(o==="-")return a-b; 
    if(o==="*")return a*b; 
    if(o==="/")return b!==0?a/b:"Error"; 
    if(o==="%")return b!==0?a%b:"Error"; 
    if(o==="//")return b!==0?Math.floor(a/b):"Error"; 
  };
  const pressNumber=n=>{
    if(n==="⌫"){ active==="num1"?setNum1(p=>p.slice(0,-1)||"0"):setNum2(p=>p.slice(0,-1)||"0"); return; } 
    if(n==="."&&(active==="num1"?num1:num2).includes(".")) return; 
    active==="num1"?setNum1(p=>p==="0"?n:p+n):setNum2(p=>p==="0"?n:p+n); 
  };
  const calcResult=async()=>{
    if(!op)return; 
    const result=calculate(num1,num2,op); 
    setLast(`${num1} ${op} ${num2} = ${result}`); 
    setNum1(result!=="Error"?result.toString():"0"); 
    setNum2(""); 
    setOp(null); 
    setActive("num1"); 
    if(result!=="Error") saveCalculation(num1,num2,op,result); 
  };
  const updateOne=async()=>{
    const {id,number1,number2,operation}=editData; 
    if(number1===""||number2===""){setSuccessMsg("❌ Both numbers are required");return;} 
    if(!ops.includes(operation)){setSuccessMsg("❌ Invalid operation");return;} 
    const result=calculate(number1,number2,operation); 
    try{ 
      await api.put(`${API_BASE}Updating_calculator_data/${id}/`, {
        number1:parseFloat(number1),
        number2:parseFloat(number2),
        operation:mapOp[operation],
        result:parseFloat(result)
      }); 
      setSuccessMsg("✅ Updated Successfully!"); 
      setTimeout(()=>{setEditModal(false);setSuccessMsg("");},1200); 
      loadHistory(); 
    }catch(e){console.log(e); setSuccessMsg("❌ Update Failed");} 
  };
  const getButtonStyle = (btn) => {
    let c;
    if(numbers.includes(btn)) c = numberColors[btn];
    else if(ops.includes(btn)) c = opColors[btn];
    else if(specialColors[btn]) c = specialColors[btn];
    else c = { light: ambient.lightBtn, dark: ambient.darkBtn, glowLight: ambient.lightGlow, glowDark: ambient.darkGlow };
    return {
      padding: "14px",
      borderRadius: "10px",
      cursor: "pointer",
      background: darkTheme ? c.dark : c.light,
      color: "#fff",
      fontSize: "1.2rem",
      border: "none",
      fontWeight: "bold",
      boxShadow: darkTheme ? c.glowDark : c.glowLight,
      textShadow: darkTheme ? c.glowDark : c.glowLight,
      animation: "glow 1.5s infinite alternate",
      transition: "0.2s"
    };
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px",background:darkTheme?ambient.darkBg:ambient.lightBg,color:darkTheme?ambient.neonText:ambient.lightText}}>
      <style>{`
        @keyframes glow {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.8); }
          100% { filter: brightness(1); }
        }
      `}</style>
      <button onClick={()=>setDarkTheme(!darkTheme)} style={{...getButtonStyle("AC"), color: darkTheme?"#00ffff":"#ff00ff"}}>
        {darkTheme?"☀ Light":"🌙 Dark"}
      </button>
      <div style={{display:"flex",gap:8,margin:12}}>
        {["🧮 Open","❌ Close","📜 History"].map(btn => (
          <button 
            key={btn} 
            onClick={()=>{
              if(btn==="🧮 Open") setShowCalc(true);
              if(btn==="❌ Close") setShowCalc(false);
              if(btn==="📜 History") setShowHis(h => !h);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              cursor: "pointer",
              background: darkTheme ? "#00ffff" : "#3333ff",
              color: darkTheme ? "#000" : "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: darkTheme ? "0 0 12px #00ffff, 0 0 20px #00cccc" : "0 0 10px #3333ff, 0 0 15px #0000aa",
              animation: "glow 1.5s infinite alternate",
              border: "none",
              transition: "0.2s"
            }}
          >
            {btn}
          </button>
        ))}
      </div>
      {showCalc && (
        <div style={{width:320,padding:18,borderRadius:18,background:darkTheme?"#051021":"#f8fbff",boxShadow:darkTheme?ambient.darkGlow:ambient.lightGlow}}>
          <div style={{background:darkTheme?"#000":"#e8f1ff",color:darkTheme?ambient.neonText:ambient.lightText,padding:12,minHeight:60,fontSize:"1.7rem",borderRadius:10,marginBottom:10,textAlign:"right",textShadow:"0 0 8px #00f6ff, 0 0 12px #00bfff"}}>
            {last || `${num1}${op||""}${num2}`}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {numbers.map(n=><button key={n} style={getButtonStyle(n)} onClick={()=>pressNumber(n)}>{n}</button>)}
            {ops.map(o=><button key={o} style={getButtonStyle(o)} onClick={()=>{setOp(o);setActive("num2")}}>{o}</button>)}
            <button style={getButtonStyle("=")} onClick={calcResult}>=</button>
            <button style={getButtonStyle("AC")} onClick={()=>{setNum1("0");setNum2("");setOp(null);setLast("")}}>AC</button>
          </div>
        </div>
      )}
      {showHis && (
        <div style={{marginTop:15,width:330,padding:12,background:darkTheme?"#0A1022":"#e8f1ff",borderRadius:12,boxShadow:darkTheme?ambient.darkGlow:ambient.lightGlow}}>
          <h3 style={{textShadow:darkTheme?"0 0 8px #00f6ff, 0 0 12px #00bfff":"0 0 4px #0099ff"}}>History</h3>
          {loading && <p>Loading...</p>}
          {history.map(r=>(
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"6px 0"}}>
              <span style={{ cursor:"pointer", textShadow: darkTheme?"0 0 6px #ffffff":"0 0 6px #000", color: darkTheme?"#ffffff":"#000", transition:"0.2s" }}
                onClick={()=>{setNum1(r.number1);setNum2(r.number2);setOp(revOp[r.operation]);setLast(`${r.number1} ${revOp[r.operation]} ${r.number2} = ${r.result}`);setShowCalc(true);}}>
                {r.number1} {revOp[r.operation]} {r.number2} = {r.result}
              </span>
              <div style={{display:"flex",gap:5}}>
                <button style={getButtonStyle("AC")} onClick={()=>{setEditData({id:r.id,number1:r.number1,number2:r.number2,operation:revOp[r.operation]});setEditModal(true);}}>✏️</button>
                <button style={getButtonStyle("AC")} onClick={()=>deleteOne(r.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editModal && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:"#000",padding:20,borderRadius:10,width:280,color:"#ff9900",boxShadow:"0 0 15px #ff9900, 0 0 25px #cc7a00"}}>
            <h3 style={{textShadow:"0 0 6px #ff9900,0 0 12px #cc7a00"}}>Edit Record</h3>
            <input value={editData.number1} onChange={e=>setEditData({...editData,number1:e.target.value})} placeholder="Number 1" style={{width:"100%",marginBottom:5,padding:6,borderRadius:6,background:"#111",color:"#ff9900",border:"1px solid #ff9900"}}/>
            <input value={editData.number2} onChange={e=>setEditData({...editData,number2:e.target.value})} placeholder="Number 2" style={{width:"100%",marginBottom:5,padding:6,borderRadius:6,background:"#111",color:"#ff9900",border:"1px solid #ff9900"}}/>
            <select value={editData.operation} onChange={e=>setEditData({...editData,operation:e.target.value})} style={{width:"100%",marginBottom:5,padding:6,borderRadius:6,background:"#111",color:"#ff9900",border:"1px solid #ff9900"}}>
              {ops.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
            {successMsg && <p style={{marginBottom:5,color:"#0f0"}}>{successMsg}</p>}
            <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
              <button style={getButtonStyle("=")} onClick={updateOne}>= Update</button>
              <button style={getButtonStyle("AC")} onClick={()=>setEditModal(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default RealisticCalculator;