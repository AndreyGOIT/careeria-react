import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.introSection}>
        <h1 className={styles.appTitle}>Northwind Management App</h1>
        <p className={styles.subtitle}>
          Tässä modernissa sovelluksessa yhdistyy <strong>React + Vite</strong>{" "}
          käyttöliittymä,
          <strong> .NET Core REST API</strong> taustapalvelu ja
          <strong> Azure SQL Database</strong> pilvitietokanta.
        </p>
      </section>

      <section className={styles.featuresSection}>
        <h2>🔹 Sovelluksen toiminnot</h2>
        <ul>
          <li>
            CRUD-toiminnot (luonti, muokkaus, poisto, listaus) asiakkaille,
            käyttäjille ja tuotteille
          </li>
          <li>
            Käyttäjähallinta roolipohjaisella käyttöoikeudella (Admin / User)
          </li>
          <li>JWT-pohjainen autentikointi ja tietoturva</li>
          <li>Dynaaminen käyttöliittymä Reactin tilanhallinnan avulla</li>
          <li>
            Yhteys <strong>Azure-pilveen</strong> sekä backendille että
            tietokannalle
          </li>
        </ul>
      </section>

      <section className={styles.techSection}>
        <h2>⚙️ Käytetyt teknologiat</h2>
        <div className={styles.techGrid}>
          <div className={styles.techCard}>React 18 / Vite</div>
          <div className={styles.techCard}>TypeScript</div>
          <div className={styles.techCard}>.NET 8 Web API</div>
          <div className={styles.techCard}>Entity Framework Core</div>
          <div className={styles.techCard}>SQL Server (Azure SQL Database)</div>
          <div className={styles.techCard}>JWT Authentication</div>
          <div className={styles.techCard}>
            Azure App Service & Static Web Apps
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>💡 Käyttötarkoitus</h2>
        <p>
          Sovellus on rakennettu demonstraatioksi siitä, miten moderni täyden
          pinon (Full Stack) verkkosovellus voidaan toteuttaa. Rakenne
          mahdollistaa helpon laajennettavuuden — esimerkiksi tilausten
          käsittelyn, raportoinnin ja datan visualisoinnin lisäämisen
          tulevaisuudessa.
        </p>
      </section>
    </div>
  );
};

export default Home;
