// src/components/user/Notifications.jsx
import React, { useEffect, useState } from 'react'
import { FiMail, FiTruck, FiBell, FiRefreshCw } from 'react-icons/fi'
import { toast } from 'react-toastify'
import API from '../../utils/api'

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: false,
    orderDelivered: false,
    push: false,
    availability: false,
  })
  const [loading, setLoading] = useState(true)

  // Load current settings
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('/api/users/notifications')
        setSettings(data)
      } catch (err) {
        toast.error('Failed to load notification settings.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const toggle = async (key) => {
    const old = settings[key]
    setSettings((s) => ({ ...s, [key]: !old }))

    try {
      await API.put('/api/users/notifications', { [key]: !old })
      toast.success(
        `${key === 'email' ? 'Emails' :
          key === 'orderDelivered' ? 'Delivery alerts' :
          key === 'push' ? 'Push notifications' :
          "Availability alerts"
        } ${!old ? 'enabled' : 'disabled'}.`
      )
    } catch (err) {
      setSettings((s) => ({ ...s, [key]: old }))
      toast.error('Update failed. Please try again.')
    }
  }

  if (loading) return <p className="p-8">Loading…</p>

  const ToggleSwitch = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className={`w-[44px] h-[22px] rounded-full cursor-pointer relative transition-all ${
        value ? 'bg-bgColor' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] transition-all ${
          value ? 'left-[22px]' : 'left-[2px]'
        }`}
      />
    </div>
  )

  return (
    <div className="w-full px-8 pt-8 text-textMain">
      <h2 className="text-[24px] font-semibold mb-6">Notifications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            key: 'email',
            icon: <FiMail />,
            title: 'Emails',
            desc:
              "We write emails to let you know what's important, like new orders and confirmations.",
          },
          {
            key: 'orderDelivered',
            icon: <FiTruck />,
            title: 'Order Delivered',
            desc: 'You will be notified once your order is delivered.',
          },
          {
            key: 'push',
            icon: <FiBell />,
            title: 'Push to your Device',
            desc:
              'Receive notifications about order status, promotions, and other updates.',
          },
          {
            key: 'availability',
            icon: <FiRefreshCw />,
            title: "Product's availability",
            desc: 'You will be notified when a product becomes available.',
          },
        ].map(({ key, icon, title, desc }) => (
          <div key={key} className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 font-medium text-[14px] mb-1">
                {icon}
                {title}
              </div>
              <p className="text-[13px] text-dimGray leading-snug">{desc}</p>
            </div>
            <ToggleSwitch
              value={settings[key]}
              onClick={() => toggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
