# NASA Climate Data Viewer

## Overview

NASA transitioned from GHCN v2 to GHCN v3.2 in 2011 and later to GHCN v4, shifting from its own data homogenization methods to NOAA/NCEI adjustments. This change introduced significant differences in how station data is processed, leading to variations between older and newer datasets. This platform enables users to compare historical and current temperature data, providing a clear and structured way to analyze these changes.

![Screenshot 2025-02-07 at 11 06 29](https://github.com/user-attachments/assets/03bdf22d-b406-498d-be19-74a8446028ca)

Users can:

- Select a weather station to view data from Version 2 (raw, combined homogenized).
- View nearby weather stations for comparison.
- Access and compare Version 4 data (adjusted, raw homogenized, and clean).
- Apply filters based on population, year range, latitude, and longitude.

This website offers a more intuitive and efficient interface compared to NASA's official platform, making it easier to navigate and compare different data versions.

![Screenshot 2025-02-07 at 11 08 55](https://github.com/user-attachments/assets/c5853b87-ef31-4950-8a73-78bbae7abce6)

## Features

- **User Authentication**: Secure user registration and login.
- **NASA Data Integration**: Fetches temperature data from NASA in real-time.
- **Data Versioning**: Displays both Version 2 and Version 4 data for side-by-side analysis.
- **Nearby Stations**: Lists additional weather stations in proximity for better regional comparison.
- **Advanced Filtering**: Enables filtering by year, latitude, longitude, and population size.
- **Optimized Interface**: Streamlined design for effortless data navigation and visualization.

## Installation

### Prerequisites

- Node.js (for frontend and API handling)
- Database (if authentication is handled via a database)
- API key (if required for accessing NASA data)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/MaxiPutz/maxGissV2.git
   cd maxGissV2
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and add the following content:
     ```sh
     DATABASE_URL="file:./dev.db.sqlite"
     SECRET_KEY="your_secret_key_here"
     MAPBOX_KEY="your_mapbox_key_here"
     ```
   - Replace the placeholder values with actual credentials.
4. Run the project:
   ```sh
   npm run dev
   ```

### Middleware

- The middleware ensures that private routes are only accessible after authentication using JWT.

## API Endpoints

### Public Endpoints

- `POST /api/register` - Registers a new user.
- `POST /api/login` - Logs in a user and returns a JWT.

### Private Endpoints (JWT Protected)

- `GET /api/private/initMetadata` - Initializes metadata.
- `GET /api/private/env` - Fetches environment configuration.
- `GET /api/private/nasa` - Retrieves general NASA climate data.
- `GET /api/private/nasa/v4Stations` - Retrieves Version 4 weather stations.
- `GET /api/private/nasa/v4Data` - Retrieves Version 4 climate data.

## Future Enhancements

- **Caching Data in a Local Database**: Currently, every dataset requires multiple API requests to NASA. For example, loading V4 data requires up to 8 requests. Implementing a caching system will significantly reduce request times and improve performance.
- **Enhanced Filtering Options**: Adding more advanced filters for deeper data analysis.
- **Mobile-Friendly Design**: Improving the interface for better usability on mobile devices.

## License

This project is licensed under the MIT License.

---

Feel free to update the repository link, add more details, or adjust as needed!
