'use client';

import React from 'react';

import ProxyItem from './proxy-item';
import { proxyFriendship } from '../_data/proxy-friendship';
import { OurCardCarousel } from '@/components/custom/our-card';

export default function ProxyOpposition() {
  return (
    <OurCardCarousel
      title="Proxy Opposition"
      contentClassName="col-span-full md:col-span-1 "
      size={'lg'}
      slides={proxyFriendship.map((item, index) => (
        <ProxyItem
          key={`slide-${item.account}`} // key unik (hindari ESLint warning)
          avatar={item.avatar}
          account={item.account}
          platform={item.platform}
          link={item.link}
          data={item.data}
          namekey={item.namekey || 'accountName'} // fallback aman
          dataKey={item.dataKey || 'value'} // fallback aman
          index={index}
        />
      ))}
      showDots={false}
    />
  );
}
