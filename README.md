Założenia projektu:

ekran startowy:

- wybór ilości graczy od 1 do 4
  DLA WIELU GRACZY:
  ekran gry:
- talia kart z iloscią kart
- pole każdego gracza (maksymalnie 8 kart), ilość punktów gracza, przyciski(losuj, stop)
  gra:
  -gracz nr1. otrzymuje 2 karty
  -jeśli dobrane są dwa Asy gracz automatycznie wygrywa
  -przejscie do ekranu ponownej gry
  -aktywują się przyciski draw / pass dla tego użytkownika
  -gracz wybiera draw/pass:
  -jeśli draw: dobiera karte
  -jesli wartosc jest niższa od 21
  -aktywują się przyciski draw / pass dla tego użytkownika
  -jeśli wartość jest równa 21 gracz wygrywa
  -przejscie do ekranu ponownej gry
  -jeśli wartość jest wyższa niż 21 gracz przegrywa
  -jeśli jest kolejny gracz
  -przejscie do kolejnego gracza
  -jeśli nie ma gracza
  -podsumowanie wyników i ogłoszenie zwyciezcy  
  -jeśli pass, wynik jest zapisywany
  -jeśli jest kolejny gracz
  -przejscie do kolejnego gracza
  -jeśli nie ma gracza
  -podsumowanie wyników i ogłoszenie zwyciezcy

DLA JEDNEGO GRACZA:
ekran gry:

- talia kart z iloscią kart
- pole każdego gracza (maksymalnie 8 kart), ilość punktów gracza, przyciski(losuj, stop), informacja o tym, że gracz2 to komputer.
  gra:
  -gracz otrzymuje 2 karty
  -jeśli dobrane są dwa Asy gracz automatycznie wygrywa
  -przejscie do ekranu ponownej gry
  -aktywują się przyciski draw / pass dla tego użytkownika
  -gracz wybiera draw/pass:
  -jeśli draw: dobiera karte
  -jesli wartosc jest niższa od 21
  -aktywują się przyciski draw / pass dla tego użytkownika
  -jeśli wartość jest równa 21 gracz wygrywa
  -przejscie do ekranu ponownej gry
  -jeśli wartość jest wyższa niż 21 gracz przegrywa
  -przejscie do ekranu ponownej gry
  -jeśli pass, wynik jest zapisywany
  -gra komputer
  -otrzymuje 2 karty
  -jeśli wynik jest miejszy niż wynik gracza: draw
  -jeśli wynik jest większy niz gracza pass
  -podsumowanie wyników i ogłoszenie zwyciezcy
  -jeśli wynik jest równy 20 pass
  -jeśli wynik jest równy 21 ogłoszenie wygranej

klasy
Game:
-v players []
-m render()
-m addPlayer()
-m startGame()
Player:
-v name
-v(p) \_points 'number'
-v(p) \_cards []
-v active boolean
-m addCard()
-m addPoints()
-m getPointsValue()
-m checkCanPlay()
Draw:
-v(p) \_card
-m drawCard()
-m getCard()
Result
-m checkWin()
-m playerWin()
-m playerLose()
Stats:
-v gameStats []
-m addPlayerResult()
-m showGameResult()

wygrana:

1. perskie oko
2. wszyscy inni maja wiecej niz 21
3. mam najblizej do 21 na koniec
