วิธีการ set up project จากเครื่อง

- run npm install
- run npm run dev(ถ้ารันเลยจะยังไม่ได้ครับ เนื่องด้วยความปลอดภัยของโปรเจคผมเก็บคีย์ของfirebase configไว้ใน.envซึ่งจะไม่ถูกpushไปในgithubผมได้ทำการdeployออกมาแล้วถ้าหากอยากrunจากโปรเจคเลยขออนุญาติให้ติดต่อมาครับเดี๋ยวผมส่งตัวแปรใน.envไฟล์ให้ครับ)

Algorithmsที่ใช้ในโปรเจค

- สำหรับAiผมใช้ Minimax Algorithms กับ Alpha-Beta prunning พอดีได้เรียนเทอมนี้พอดีครับเลยลองเอามาใช้ทำAiดู เป้น Algprithmsสำหรับเกมที่มี2ผู้เล่นโดยที่จะใข้การbacktracking ไปดูทางที่ optimalที่สุดโดยจะดูว่ามีทางไหนที่ผู้เล่นอีกฝั่งจะสามารถเลือกmoveที่ทำให้มีโอกาสชนะมากกว่าเรียกว่า maximized player กับ minimized playerจะอันไหนก็คล้ายๆกันในโปรเจคนี้ผมเลือกเป็น minimized player ส่วน Alpha-Beta prunning เอามาใช้เพื่อนลดmomory spaceเนื่องจากว่าเราสามารถตัดเส้นทางที่เรารู้ว่าเขาคงไม่เลือกออกไปได้แต่AIที่ผมทำถ้าบอร์ดใหญ่ๆบางที่ก็รับไม่ไหวครับ T_T

การออกแบบโปรแแกรม
-หลักๆจะมี2หน้าครับหน้าแรกจะเป็นการinputข้อมูลก่อนเข้าไปเล่นกับAIโดยมีจะลิสของReplayในแต่ละตาให้ดูด้านล่างครับส่วนหน้าที่2จะเป็นเกมที่เราเล่นกับAIโดยที่AIจะเล่นเป็นO playerตัวเกมจะสุ่มว่าใครได้เริ่มก่อนใครสามารถเรียงได้ก่อนก็ชนะครับพอกดปุ่มbackจะกลับไปหน้าแรกพร้อมกับreplayจากตานั้นครับ
