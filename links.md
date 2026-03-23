# Broker & agent paths

## Broker

```
/broker
/broker/registration
/broker/login
/broker/forgot-password
/broker/otp-verification
/broker/dashboard
/broker/total-listing
/broker/manage-listings
/broker/manage-listings/:listingId
/broker/manage-listings/edit/:listingId
/broker/manage-listings/renew/:listingId
/broker/manage-listings-request
/broker/total-showing-requests
/broker/agents-management
/broker/agents-management/add-agent
/broker/agents-management/assign-listings
/broker/agents-management/performance/:agentId
/broker/agents-management/agent/:agentId
/broker/manage-calendars
/broker/manage-profile
/broker/messages
/broker/settings
```

## Agent

```
/agent
/agent/login
/agent/dashboard
/agent/active-listing
/agent/manage-profile
/agent/manage-listings
/agent/manage-listings/:id
/agent/manage-listings/:id/edit
/agent/manage-listings-request
/agent/settings
/agent/alerts
/agent/messages
/agent/manage-calendars
/agent/listing-events
/agent/listing-events/:id
/agent/forgot-password
/agent/forgot-password-otp
```

`src/broker/BrokerRoutes.tsx` · `src/agent/AgentRoutes.tsx`
