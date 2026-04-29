import type { Profile } from '../types'

export const PROFILES: Record<string, Profile> = {
  INTJ:{name:"建築師",desc:"擁有獨立思考的戰略眼光，計劃周密且執行力強。追求知識的深度，對平庸毫無耐心。",careers:["策略顧問","系統架構師","研究員","執行長","律師"],compat:["ENTP","ENFP","INTJ","ENTJ"],color:"#3C3489",bg:"#EEEDFE"},
  INTP:{name:"思考者",desc:"邏輯嚴謹的理論家，享受探索複雜的抽象概念。思維靈活，對規則保持批判性眼光。",careers:["軟體工程師","數學家","哲學家","資料科學家","教授"],compat:["ENTJ","ESTJ","INFJ","ENFJ"],color:"#0C447C",bg:"#E6F1FB"},
  ENTJ:{name:"指揮官",desc:"天生的領導者，目標導向且果斷。善於制定長期計劃並帶領團隊高效執行。",careers:["企業主","管理顧問","法官","政治人物","投資銀行家"],compat:["INTP","ISTP","INFP","INFJ"],color:"#712B13",bg:"#FAECE7"},
  ENTP:{name:"辯論家",desc:"思維敏捷的創新者，享受智識辯論和挑戰現狀。對新奇的想法充滿熱忱。",careers:["創業家","律師","廣告創意","產品經理","辯護律師"],compat:["INTJ","INFJ","ENTJ","INFP"],color:"#27500A",bg:"#EAF3DE"},
  INFJ:{name:"提倡者",desc:"富有洞察力的理想主義者，致力於幫助他人實現潛能。稀有且深思熟慮。",careers:["心理諮商師","作家","社工","人力資源","非營利組織"],compat:["ENTP","ENFP","INTJ","INFP"],color:"#085041",bg:"#E1F5EE"},
  INFP:{name:"調停者",desc:"充滿同理心的理想主義者，渴望真實和有意義的連結。以個人價值觀為行動指南。",careers:["作家","藝術家","心理師","教師","翻譯"],compat:["ENFJ","ENTJ","INFJ","ENFP"],color:"#72243E",bg:"#FBEAF0"},
  ENFJ:{name:"主角",desc:"富有魅力的天生領袖，擅長激勵他人並培養團隊凝聚力。有強烈的使命感。",careers:["教育家","外交官","教練","人資總監","政治家"],compat:["INFP","ISFP","INTP","ENFP"],color:"#0F6E56",bg:"#E1F5EE"},
  ENFP:{name:"競選者",desc:"充滿創意和熱情的社交蝴蝶，對可能性無窮無盡感到興奮。善於發掘他人潛力。",careers:["創業家","演員","廣告人","記者","心理師"],compat:["INTJ","INFJ","ENFJ","ENTJ"],color:"#633806",bg:"#FAEEDA"},
  ISTJ:{name:"物流師",desc:"可靠盡職的守護者，重視傳統和責任。做事有條不紊，值得他人信賴。",careers:["會計師","軍官","法官","行政人員","工程師"],compat:["ESTP","ESFP","ISTJ","ESTJ"],color:"#444441",bg:"#F1EFE8"},
  ISFJ:{name:"守護者",desc:"溫暖細心的守護者，默默付出卻不求回報。對細節敏感，重視傳統。",careers:["護士","教師","社工","行政助理","室內設計師"],compat:["ESTP","ESFP","ISFJ","ESFJ"],color:"#0C447C",bg:"#E6F1FB"},
  ESTJ:{name:"總經理",desc:"務實高效的執行者，善於組織和管理資源。重視秩序、規則和集體利益。",careers:["企業管理者","法官","軍官","財務主管","行政長官"],compat:["ISTP","INTP","ESTJ","ISTJ"],color:"#412402",bg:"#FAEEDA"},
  ESFJ:{name:"執政官",desc:"熱情友善的協調者，以關心他人為樂。善於維持和諧氣氛並照顧集體需求。",careers:["教師","醫療工作者","社區組織者","公關","人力資源"],compat:["ISFP","INFP","ESFJ","ISFJ"],color:"#26215C",bg:"#EEEDFE"},
  ISTP:{name:"鑑賞家",desc:"冷靜分析的問題解決者，善於理解複雜系統和工具。享受動手實作的挑戰。",careers:["工程師","機械師","外科醫生","程式設計師","飛行員"],compat:["ESTJ","ESFJ","ISTP","ESTP"],color:"#27500A",bg:"#EAF3DE"},
  ISFP:{name:"探險家",desc:"溫和藝術的冒險家，活在當下並欣賞美的事物。以行動表達情感勝於言語。",careers:["藝術家","設計師","音樂家","獸醫","廚師"],compat:["ENFJ","ESFJ","ISFP","ESFP"],color:"#791F1F",bg:"#FCEBEB"},
  ESTP:{name:"企業家",desc:"精力充沛的行動派，善於抓住眼前機會並隨機應變。討厭枯燥和限制。",careers:["創業家","銷售主管","急救員","股票交易員","運動員"],compat:["ISFJ","ISTJ","ESTP","ISTP"],color:"#633806",bg:"#FAEEDA"},
  ESFP:{name:"表演者",desc:"活潑外向的娛樂家，將快樂和正能量帶給周圍的人。享受當下和自發性。",careers:["演員","活動主持人","業務員","旅遊達人","社群經理"],compat:["ISFJ","ISTJ","ESFP","ISFP"],color:"#993C1D",bg:"#FAECE7"},
}

export const DIM_COLORS: Record<string, string> = {
  EI: "#7F77DD",
  SN: "#1D9E75",
  TF: "#D85A30",
  JP: "#378ADD",
}
