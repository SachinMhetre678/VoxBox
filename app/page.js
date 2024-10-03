"use client"
import Head from 'next/head';
import { useState } from 'react';
import Recorder from './_components/Recorder';
import Header from './_components/Header';

export default function Home() {
  return (
    <div>
      <Header/>
      <Recorder/>
    </div>
  );
}
