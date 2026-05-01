import Layout from "../components/Layout";
import Row from "../components/Row";
import Card from "../components/Card";
import { useState } from "react";

function Home() {
  const quickAccess = [
    { id: 1, title: "Bhool", img: "https://via.placeholder.com/50" },
    { id: 2, title: "English", img: "https://via.placeholder.com/50" },
    { id: 3, title: "Tum Ho Radio", img: "https://via.placeholder.com/50" },
    { id: 4, title: "Mood 2", img: "https://via.placeholder.com/50" },
    { id: 5, title: "AFGHAN JALEBI", img: "https://via.placeholder.com/50" },
    { id: 6, title: "Tum", img: "https://via.placeholder.com/50" },
    { id: 7, title: "Hum", img: "https://via.placeholder.com/50" },
    {
      id: 8,
      title: "Can't Tell Me Nothing",
      img: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Layout>
      <div className="quick-access-grid">
        {quickAccess.map((item) => (
          <div key={item.id} className="quick-card">
            <img src={item.img} alt={item.title} />
            <h4>{item.title}</h4>
          </div>
        ))}
      </div>

      <Row title="Jump back in">
        <Card
          id={1}
          type="playlist"
          title="AGENCY"
          subtitle="Talha Anjum"
          image="https://via.placeholder.com/150"
        />
        <Card
          id={2}
          type="playlist"
          title="KARACHI CHAL"
          subtitle="Young Stunners"
          image="https://via.placeholder.com/150"
        />
        <Card
          id={3}
          type="playlist"
          title="ANJAAN"
          subtitle="Jani"
          image="https://via.placeholder.com/150"
        />
        <Card
          id={4}
          type="playlist"
          title="LONG WAY DOWN"
          subtitle="Tom Odell"
          image="https://via.placeholder.com/150"
        />
      </Row>

      <Row title="Recently Artist">
        <Card
          id={5}
          type="artist"
          title="Midnights"
          subtitle="Taylor Swift"
          image="https://via.placeholder.com/150"
        />
      </Row>
    </Layout>
  );
}

export default Home;
