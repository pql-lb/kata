Time spent: ~3 hours

I am using atomic design pattern for components to keep folder structure clean and simple. I fetch the data (via the hook 'FetchData') & store within the context under 'prices', I then display this list through the component List. When an item is added to the cart a 'count' property is added to each item in the cart array and stored in the context under the key 'cart'. Anytime the cart changes the running total is calculated using a utility function 'calculateTotal' - this is the function used to also calculate the final total which takes into account the discounts & assigns properties 'discounted' and 'discountedPrice' to the discounted cart items. This is then used to render the final list of cart items in the component 'PriceDisplay'. Before navigating to the checkout I use another hook 'CalculateTotal' to refetch the data in case of any changes to the pricing and use the new data to replace the cart with updated price information which triggers the calculation of the final total within the useEffect hook within the Cart component.

For storing the data I've used an s3 bucket behind a cloudfront distribution. I used an s3 bucket as it said the data will be changing frequently so ideally the data should be seperated from the code. I used Cloudfront to allow faster fetching of the data, in particular for the display of the products list. I used a TTL of 5 minutes on my Cloudfront distribution as the data is frequently changing. The data is fetched twice, firstly to populate the list of items and second before the redirection to the checkout. On the second fetch I bypass the cache to ensure data is up to date using a cache-bust. I use a custom hook for data fetching to seperate data fetching logic.  
With more time I would implement either 1. Cloudfront invalidation everytime the data changes using s3 event notifications & a lambda function or 2. I would store the data in a database such as Dynamodb

For state I used the context API due to the small size of the application. If this was a larger application/data source I would either split up the context (having a seperate contexts for the products list and cart) or use Redux.

For the cart I am using local storage so that the cart persists on page refresh. With more time/budget I would use Elasticache and store cart data alongside session information.

For payment processing I would use Stripe to handle actual payments. I would use Payment elements to allow for a customizable checkout experience.

With more time I would also implement better styling and animations with gsap. I also would have implemented tests for calculation of the running and final total.

For a larger list of products I would have used windowing to display data within the List component.
