select * from users;
SELECT * FROM personal_access_tokens;
SELECT * FROM schoolclasses;
SELECT * FROM students;
SELECT * FROM sports;
SELECT * FROM playingsports;


select count(*) from schoolclasses;

# Osztálylétszámok
SELECT sc.osztalyNev, COUNT(*) letszam from  students st
  INNER JOIN schoolclasses sc ON sc.id = st.schoolclassId
  GROUP BY sc.osztalyNev
;

# ösztöndíjak ellenõrzése
SELECT osztondij, MIN(atlag) minAtlag, MAX(atlag) maxAtlag from students
  
  GROUP BY osztondij
  ;

select diakNev, szulDatum, sc.osztalyNev, FLOOR(DATEDIFF(CURDATE(), szulDatum)/365.25) eletkor from students st
INNER JOIN schoolclasses sc ON sc.id = st.schoolclassId
order BY eletkor;


select   FLOOR(DATEDIFF(CURDATE(), szulDatum)/365.25) eletkor, MIN(sc.osztalyNev), max(sc.osztalyNev) from students st
INNER JOIN schoolclasses sc ON sc.id = st.schoolclassId
  GROUP BY eletkor
order BY eletkor;

select   FLOOR(DATEDIFF(CURDATE(), szulDatum)/365.25) eletkor, GROUP_CONCAT(DIstinct sc.osztalyNev SePARATOR ', ') from students st
INNER JOIN schoolclasses sc ON sc.id = st.schoolclassId
  GROUP BY eletkor
order BY eletkor;


# diákok táblázathoz
select s.*, FLOOR(DATEDIFF(CURDATE(), s.szulDatum)/365.25) eletkor, sc.osztalyNev from students s
  INNER JOIN schoolclasses sc ON s.schoolclassId = sc.id
  WHERE s.schoolclassId = 1 
  ORDER BY s.diakNev;

# sorbarendez, keres
select * from schoolclasses
  WHERE osztalyNev like '%1%'
  ORDER BY osztalyNev asc;
