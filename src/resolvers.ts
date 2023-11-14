import { PubSub } from 'graphql-subscriptions';

import { bills } from './database';

export const pubsub = new PubSub();

export const  resolvers = {
    Query: {
      bills: () => bills,
    },
    Mutation: {
      //The signature is (parent, args, contextValue, info)
      editBillAmount: async (_, args, datasourse) => { 
        const data= await datasourse
        
          const bill = bills.find(bill => bill.id === args.billId);
          
          if (!bill) {
              throw new Error(`Couldn't find bill with id ${args.billId}`);
          }

          bill.billAmount = args.billAmount;
          
          //Only change done to make subscription work
          pubsub.publish('BILL_EDITED', { billEdited: bill });

          return {
              code: 200,
              success: true,
              message: 'Bill amount edited successfully',
          };
      }
  },
    Subscription: {
      billEdited: {
        subscribe: () => pubsub.asyncIterator(['BILL_EDITED']),
      },
      }
    }