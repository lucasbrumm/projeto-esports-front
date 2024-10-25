import { Metric } from 'web-vitals'

type ReportHandler = (metric: Metric) => void

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      webVitals.getCLS(onPerfEntry)
      webVitals.getFID(onPerfEntry)
      webVitals.getFCP(onPerfEntry)
      webVitals.getLCP(onPerfEntry)
      webVitals.getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
