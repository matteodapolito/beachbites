# BeachBites 🌴🍔

![beachbites-video](https://s1.gifyu.com/images/S1ns8.gif)

## Descrizione del Progetto

**BeachBites** è un progetto sviluppato per l'esame di Tecnologie Web all'Università degli Studi di Modena e Reggio Emilia, A.A. 2023/2024. Si tratta di un servizio SaaS (Software as a Service) progettato per la gestione delle ordinazioni in spiaggia. L'obiettivo di BeachBites è semplificare l'esperienza degli utenti negli stabilimenti balneari, migliorando la gestione degli ordini e delle impostazioni tramite funzionalità avanzate e un'interfaccia user-friendly.

## Funzionalità Principali

- **🔒 Autenticazione Utenti:** Sistema di registrazione e login sicuro per i gestori degli stabilimenti.
- **⚙️ Gestione Impostazioni Stabilimenti:** Gli stabilimenti balneari possono configurare le proprie impostazioni, come menù, orari di apertura e chiusura, numero di ombrelloni, zona dove il servizio è attivo tramite coordinate GPS.
- **📲 Sistema di Ordinazione:** Permette ai clienti di effettuare ordini direttamente dal proprio dispositivo, con notifiche in tempo reale e stampa comanda per i gestori.
- **📊 Dashboard per i Gestori:** Pannello di controllo completo per monitorare gli ordini in arrivo, gestire le richieste dei clienti, e visualizzare le statistiche di vendita.
- **💳 Pagamento Integrato:** Supporto per vari metodi di pagamento, semplificando la gestione economica per gli stabilimenti.

## Tecnologie Utilizzate

- **Backend**: Django (Python)
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Autenticazione**: JWT (JSON Web Tokens)
- **API**: RESTful
- **Gestione Email**: AWS SES

## Funzionalità Chiave

1. **Gestione Utenti e Autenticazione**

   - Registrazione, login, logout
   - Autenticazione JWT
   - Gestione impostazioni stabilimento

2. **Sistema di Ordini**

   - Creazione e gestione ordini
   - Visualizzazione storico ordini
   - Dettagli ordine con prodotto scelti

3. **Gestione Stabilimento**

   - Configurazione dettagli (nome, indirizzo, orari, zona)
   - Gestione prodotti

4. **Gestione Email**
   - Attivazione account tramite AWS SES

## Installazione e Avvio

### Backend

1. Clonare il repository
   ```bash
   git clone https://github.com/tuo-username/beachbites.git
   ```
2. Installare dipendenze
   ```bash
   pip install -r requirements.txt
   ```
3. Configurare il file /frontend/.env
   ```bash
   DEVELOPMENT_MODE=<bool>
   DJANGO_SECRET_KEY=<django_secret_key>
   DEBUG=<bool>
   AWS_SES_ACCESS_KEY_ID=<token>
   AWS_SES_SECRET_ACCESS_KEY=<token>
   AWS_SES_REGION_NAME=<ewgion>
   AWS_SES_FROM_EMAIL=<email>
   DOMAIN=<domain>
   AUTH_COOKIE_SECURE=<bool>
   ```
4. Migrazioni
   ```bash
   python manage.py migrate

   ```
5. Avviare server
   ```bash
   python manage.py runserver
   ```

### Frontend

    npm install

    # Sviluppo
    npm run dev

    # Produzione
    npm run build
    npm run start
