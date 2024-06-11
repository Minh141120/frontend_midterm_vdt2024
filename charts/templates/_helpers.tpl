{{/*
Return the fully qualified app name.
*/}}
{{- define "web.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Return the name of the chart.
*/}}
{{- define "web.name" -}}
{{- printf "%s" .Chart.Name -}}
{{- end -}}

{{/*
Return the chart name and version.
*/}}
{{- define "web.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version -}}
{{- end -}}
